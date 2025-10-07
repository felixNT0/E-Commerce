import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API_BASEURL;
const axiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

// ----------------------------------------------------------------------

// Your function to retrieve the token
const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Add request interceptor to include JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await axiosInstance.get<T>(url, { ...config });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || error.response?.data || null;
      const status = error.response?.status;
      throw new Error(
        serverMessage
          ? `Request failed (${status}): ${JSON.stringify(serverMessage)}`
          : error.message
      );
    }
    throw error;
  }
};

export const mutator = async <Data>(
  request: AxiosRequestConfig
): Promise<Data> => {
  try {
    const res = await axiosInstance(request);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      const serverMessage =
        axiosError.response?.data?.message || axiosError.response?.data || null;
      const status = axiosError.response?.status;
      const msg = serverMessage
        ? `Request failed (${status}): ${JSON.stringify(serverMessage)}`
        : axiosError.message;
      // Log full response for debugging
      // eslint-disable-next-line no-console
      console.error(
        "Axios error response:",
        axiosError.response?.data,
        "status:",
        status
      );
      throw new Error(msg);
    }
    throw error;
    // throw new Error("Unknown error occurred");
  }
};

let refreshFailed = false;

const logout = () => {
  // Call the logout function from the store
  localStorage.removeItem("token");
  // This will clear user state and can be extended to redirect
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we've already failed refresh, or this is the refresh endpoint itself, don't retry
    if (refreshFailed || originalRequest.url?.includes("/auth/refresh-token")) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshFailed = true;
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
