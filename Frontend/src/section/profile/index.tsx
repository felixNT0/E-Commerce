"use client";
import Button from "@/component/button";
import Input from "@/component/input";
import Select from "@/component/select";
import Header from "@/layout/header";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  about: Yup.string(),
  photo: Yup.mixed(),
  coverPhoto: Yup.mixed(),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
});

const ProfileAndSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    about: "",
    photo: null,
    coverPhoto: null,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
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
      <div className="p-8 bg-gray-50 min-h-screen ">
        <div className="mx-auto max-w-2xl ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                {/* Profile Section */}
                <div className="space-y-12 border-b border-gray-900/10 pb-12 ">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <Input
                          id="username"
                          name="username"
                          placeholder="janesmith"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          label={""}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        About
                      </label>
                      <div className="mt-2">
                        <Input
                          id="about"
                          name="about"
                          as="textarea"
                          rows={3}
                          placeholder="Write a few sentences about yourself."
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          label={""}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Photo
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <div className="h-12 w-12 text-gray-300">
                          {/* Placeholder for photo */}
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <Button
                          type="button"
                          onClick={() =>
                            document.getElementById("photo-upload")?.click()
                          }
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Change
                        </Button>
                        <input
                          id="photo-upload"
                          name="photo"
                          type="file"
                          className="sr-only"
                          onChange={(event: any) =>
                            setFieldValue("photo", event.currentTarget.files[0])
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div className="mx-auto h-12 w-12 text-gray-300">
                            {/* Placeholder for cover photo */}
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="cover-photo-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-[#216869] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#216869] focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="cover-photo-upload"
                                name="coverPhoto"
                                type="file"
                                className="sr-only"
                                onChange={(event: any) =>
                                  setFieldValue(
                                    "coverPhoto",
                                    event.currentTarget.files[0]
                                  )
                                }
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="space-y-12 border-b border-gray-900/10 pb-12 mt-4">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <Input
                          id="first-name"
                          name="firstName"
                          placeholder="Jane"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          label={""}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <Input
                          id="last-name"
                          name="lastName"
                          placeholder="Smith"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          label={""}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          label={""}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <Select
                          name="country"
                          options={[
                            { value: "United States", label: "United States" },
                            { value: "Canada", label: "Canada" },
                          ]}
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          value={""}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ProfileAndSettings;
