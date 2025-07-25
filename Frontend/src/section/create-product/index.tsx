"use client";

import Button from "@/component/button";
import Input from "@/component/input";
import Select from "@/component/select";
import { useAppData } from "@/context";
import routes from "@/routes";
import { ProductItem, ProductPayload } from "@/types/product";
import { formikHelper, generateUniqueId } from "@/util/helper";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Image URLs are required"),
});

const CreateProduct = () => {
  const { addProduct, categories } = useAppData();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialValues: ProductPayload = {
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      setIsLoading(true);

      const newProduct = {
        ...values,
        id: generateUniqueId(),
        createdAt: new Date().toISOString(),
      };

      addProduct(newProduct as ProductItem);

      setTimeout(async () => {
        enqueueSnackbar("Product added successfully!");
        resetForm();
        setIsLoading(false);
        router.push(routes.app.home);
      }, 3000);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#1f2421] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="relative w-full max-w-md p-8 bg-white/10 rounded-lg shadow-lg backdrop-blur-sm"
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-100"
          onClick={() => router.back()}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 13l-7-7-7 7" />
            <path d="M5 19h14" />
          </svg>
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Add New Product
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { getFieldProps, isValid, setFieldValue, dirty } = formik;

            return (
              <Form className="w-full">
                <div className="mb-4">
                  <Input
                    label="Product Name"
                    placeholder="Enter product name"
                    {...getFieldProps("name")}
                    {...formikHelper(formik, "name")}
                  />
                </div>

                <div className="mb-4">
                  <Select
                    name="category"
                    value={formik.values.category}
                    label="Category"
                    options={categories}
                    onChange={(value) => setFieldValue("category", value)}
                    status={
                      formik.touched.category && formik.errors.category
                        ? "danger"
                        : undefined
                    }
                    {...formikHelper(formik, "category")}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    label="Price"
                    placeholder="Enter price"
                    type="number"
                    {...getFieldProps("price")}
                    {...formikHelper(formik, "price")}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    label="Image URLs"
                    placeholder="Enter image URL"
                    type="text"
                    {...getFieldProps("imageUrl")}
                    {...formikHelper(formik, "imageUrl")}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    as="textarea"
                    label="Description"
                    placeholder="Enter product description"
                    {...getFieldProps("description")}
                    {...formikHelper(formik, "description")}
                  />
                </div>

                <div className="mt-6">
                  <Button
                    loading={isLoading}
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    Add Product
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </div>
  );
};

export default CreateProduct;
