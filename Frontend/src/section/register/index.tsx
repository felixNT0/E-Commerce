"use client";
import { useRegister } from "@/api/auth"; // ✅ import your custom register hook
import Button from "@/component/button";
import IconButton from "@/component/icon-button";
import Input from "@/component/input";
import routes from "@/routes";
import { formikHelper, setStoredJSONValuesToLocalStorage } from "@/util/helper";
import { Form, Formik, useField } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import * as Yup from "yup";

// ✅ Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(
      /[!@#$%^&*(),.?\":{}|<>]/,
      "Password must contain a special character"
    )
    .required("Password is required"),
  password_confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
});

// ✅ Main Register Component
const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, registerLoading } = useRegister();

  const initialValues = {
    first_name: "",
    last_name: "",
    display_name: "",
    date_of_birth: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      // Build the payload according to your backend's expected structure
      const payload = {
        userName: values.display_name,
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        password: values.password,
        dateOfBirth: values.date_of_birth,
        role: "Customer", // ✅ required by backend
      };

      // Call API via your React Query mutation hook
      await register(payload);

      enqueueSnackbar("Registration successful!", { variant: "success" });

      // Optionally store user locally (optional)
      await setStoredJSONValuesToLocalStorage("currentUser", {
        ...payload,
        isLoggedIn: false, // not logged in yet
      });

      // Redirect to login
      router.push("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      enqueueSnackbar(error.message || "An error occurred", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex items-center justify-center h-screen max-sm:px-4 bg-[#1f2421] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="w-full max-w-md p-8 bg-white/10 rounded-lg shadow-lg backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Register
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { getFieldProps, isValid, values, errors, dirty } = formik;
            return (
              <Form>
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <motion.div className="space-y-6 w-full">
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      {...getFieldProps("email")}
                      {...formikHelper(formik, "email")}
                    />

                    <Input
                      label="Password"
                      type="password"
                      autoComplete="password"
                      placeholder="Enter your password"
                      {...getFieldProps("password")}
                      {...formikHelper(formik, "password")}
                    />

                    <PasswordChecker name="password" />

                    <Input
                      label="Confirm Password"
                      type="password"
                      autoComplete="password"
                      placeholder="Confirm your password"
                      {...getFieldProps("password_confirm")}
                      {...formikHelper(formik, "password_confirm")}
                    />

                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        !values.email ||
                        !values.password ||
                        !values.password_confirm ||
                        !!errors.password_confirm ||
                        values.password.length < 8 ||
                        values.password_confirm.length < 8
                      }
                    >
                      Continue
                    </Button>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <motion.div className="space-y-6 w-full">
                    <div className="flex items-center gap-[14px]">
                      <div className="w-full">
                        <Input
                          label="First Name"
                          placeholder="Enter first name"
                          {...getFieldProps("first_name")}
                          {...formikHelper(formik, "first_name")}
                        />
                      </div>
                      <div className="w-full">
                        <Input
                          label="Last Name"
                          placeholder="Enter last name"
                          {...getFieldProps("last_name")}
                          {...formikHelper(formik, "last_name")}
                        />
                      </div>
                    </div>

                    <Input
                      label="Display Name"
                      placeholder="Enter display name (optional)"
                      {...getFieldProps("display_name")}
                      {...formikHelper(formik, "display_name")}
                    />

                    <Input
                      type="date"
                      label="Date of Birth"
                      placeholder="DD/MM/YYYY"
                      {...getFieldProps("date_of_birth")}
                      {...formikHelper(formik, "date_of_birth")}
                    />

                    <div className="flex gap-4 items-center">
                      <IconButton type="button" onClick={prevStep}>
                        <FaArrowLeft className="text-white" />
                      </IconButton>
                      <Button
                        loading={registerLoading}
                        type="submit"
                        disabled={!isValid || !dirty}
                      >
                        Register
                      </Button>
                    </div>
                  </motion.div>
                )}
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
          <p>Have an account?</p>
          <Link
            href={routes.auth.login}
            className="hover:underline hover:text-[#216869]"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

// ✅ Password strength helper
const PasswordChecker = ({ name }: any) => {
  const [field] = useField(name);
  const requirements = [
    { regex: /.{8,}/, label: "8+ characters" },
    { regex: /[A-Z]/, label: "UPPERCASE (A-Z)" },
    { regex: /[a-z]/, label: "lowercase (a-z)" },
    { regex: /[0-9]/, label: "Number (0-9)" },
    { regex: /[!@#$%^&*(),.?\":{}|<>]/, label: "Symbols (@ - . , _ # ? !)" },
  ];
  const checkRequirement = (regex: any) => regex.test(field.value);

  return (
    <div className="password-requirements">
      {requirements.map((req, i) => (
        <div
          key={i}
          className={`requirement ${
            checkRequirement(req.regex)
              ? "met text-green-400"
              : "unmet text-gray-400"
          }`}
        >
          {req.label}
        </div>
      ))}
    </div>
  );
};
