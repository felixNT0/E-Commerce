"use client";
import Button from "@/component/button";
import Input from "@/component/input";
import routes from "@/routes";
import {
  formikHelper,
  getStoredJSONValuesFromLocalStorage,
  setStoredJSONValuesToLocalStorage,
} from "@/util/helper";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values: any) => {
    const { email, password } = values;

    try {
      setIsLoading(true);
      setError("");
      const storedUser = await getStoredJSONValuesFromLocalStorage(
        "currentUser"
      );

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        setTimeout(async () => {
          await setStoredJSONValuesToLocalStorage("currentUser", {
            ...storedUser,
            isLoggedIn: true,
          });
          router.push("/");
          setIsLoading(false);
        }, 3000);
      } else {
        setTimeout(() => {
          setError("Invalid email or password");
          setIsLoading(false);
        }, 3000);
      }
    } catch (e) {
      enqueueSnackbar("An error occurred", { variant: "error" });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen  max-sm:px-4  bg-[#1f2421] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="w-full max-w-md p-8 bg-white/10 rounded-lg shadow-lg backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back, Login
        </h2>
        {error && (
          <div className="p-2 rounded-lg bg-red-500 text-center mb-2">
            <p className="text-white text-sm ">{error}</p>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { getFieldProps, isValid, dirty } = formik;
            return (
              <Form>
                <motion.div className="space-y-6 placeholder:text-gray-100 w-full">
                  <Input
                    label="Email"
                    placeholder="Enter Email"
                    {...getFieldProps("email")}
                    {...formikHelper(formik, "email")}
                    className=" placeholder:text-sm "
                  />

                  <Input
                    label="Password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter Password"
                    {...getFieldProps("password")}
                    className=" placeholder:text-sm "
                    {...formikHelper(formik, "password")}
                  />

                  <Button
                    loading={isLoading}
                    type={"submit"}
                    disabled={!isValid || !dirty}
                  >
                    {"Login"}
                  </Button>
                </motion.div>
              </Form>
            );
          }}
        </Formik>
        <div className="my-6 flex items-center gap-6">
          <div className="w-full h-[0.5px] bg-gray-200" />
          <p>or</p>
          <div className="w-full h-[0.5px] bg-gray-200" />
        </div>

        <div className="flex justify-center items-center mt-6 gap-1 text-sm">
          <p>Don’t have an account yet?</p>
          <Link
            href={routes.auth.register}
            className="hover:underline hover:text-[#216869]"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
