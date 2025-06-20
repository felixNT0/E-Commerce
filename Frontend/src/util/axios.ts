import axios, { AxiosError, AxiosRequestConfig } from "axios";
// import { getAccessToken } from "./token";

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

// // axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axiosInstance.defaults.withCredentials = true;

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await axiosInstance.get<T>(url, {
      ...config,
    });
    return res.data;
  } catch (error) {
    // Enhanced error handling with better TypeScript typing
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Request failed"
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
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Request failed"
      );
    }
    throw error;
    // throw new Error("Unknown error occurred");
  }
};

let refreshFailed = false;

const logout = () => {
  // Call the logout function from the store
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
