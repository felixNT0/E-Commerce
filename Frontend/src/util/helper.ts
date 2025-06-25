import { FormikProps } from "formik";
import { v4 as uuidv4 } from "uuid";

export const formikHelper = <T, key extends keyof T>(
  formik: FormikProps<T>,
  value: key
): { helperText: string; status?: "danger" } => {
  return {
    status:
      formik.touched[value] && (formik.errors[value] as string)
        ? "danger"
        : undefined,
    helperText:
      (formik.touched[value] && (formik.errors[value] as string)) || "",
  };
};

// helper.ts
export const getStoredJSONValuesFromLocalStorage = async (key: string) => {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(key);
  try {
    const parsed = JSON.parse(value || "null");
    return JSON.parse(JSON.stringify(parsed)); // sanitize
  } catch {
    return null;
  }
};

export const setStoredJSONValuesToLocalStorage = async (
  key: string,
  value: any
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeDataFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const generateUniqueId = () => uuidv4();

export const alpha = (color: any, opacity: any) => {
  const [r, g, b] = color?.match(/\d+/g);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
