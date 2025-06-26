"use client";
import Button from "@/component/button";
import Input from "@/component/input";
import Select from "@/component/select";
import Header from "@/layout/header";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  company: Yup.string(),
  message: Yup.string().required("Message is required"),
  country: Yup.string().required("Country is required"),
  agreeToPolicies: Yup.bool().oneOf([true], "You must agree to the policies"),
});

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    message: "",
    country: "US",
    agreeToPolicies: false,
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      // Handle form submission logic here
      console.log(values);
      setIsLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="isolate bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#49a078] to-[#216869] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900  dark:text-gray-100 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600  dark:text-gray-400">
            We'd love to hear from you. Please fill out the form below to get in
            touch.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="mx-auto mt-16 max-w-xl sm:mt-20">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold leading-6 text-gray-900   dark:text-gray-100"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      label={""}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold leading-6 text-gray-900  dark:text-gray-100"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      label={""}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold leading-6 text-gray-900  dark:text-gray-100"
                  >
                    Company
                  </label>
                  <div className="mt-2.5">
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      label={""}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900  dark:text-gray-100"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@domain.com"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      label={""}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-semibold leading-6 text-gray-900  dark:text-gray-100"
                  >
                    Phone number
                  </label>
                  <div className="relative mt-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="country" className="sr-only">
                        Country
                      </label>
                      <Select
                        name="country"
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-4 pr-9 text-gray-400   focus:ring-2 focus:ring-inset sm:text-sm"
                        options={[
                          { value: "US", label: "US" },
                          { value: "CA", label: "CA" },
                          { value: "EU", label: "EU" },
                        ]}
                        value={""}
                        onChange={() => {}}
                      />
                    </div>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      label={""}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900  dark:text-gray-100"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <Input
                      id="message"
                      name="message"
                      as="textarea"
                      rows={4}
                      placeholder="Your message here"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      label={""}
                    />
                  </div>
                </div>
                <div className="flex gap-x-4 sm:col-span-2">
                  <div className="flex h-6 items-center">
                    <button
                      type="button"
                      className="flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      role="switch"
                      aria-checked="false"
                      aria-labelledby="switch-1-label"
                    >
                      <span className="sr-only">Agree to policies</span>
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 translate-x-0 transform rounded-full bg-white ring-1 ring-gray-900/10 transition-transform duration-200 ease-in-out"
                      ></span>
                    </button>
                  </div>
                  <div className="text-sm leading-6">
                    <p className=" dark:text-gray-100">
                      By checking this box, you agree to our -
                      <a href="#" className="font-semibold text-indigo-600">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Contact;
