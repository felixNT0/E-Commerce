"use client";
import Button from "@/component/button";
import Input from "@/component/input";
import { useAppData } from "@/context";
import {
  formikHelper,
  generateUniqueId,
  removeDataFromLocalStorage,
} from "@/util/helper";
import paths from "@/util/paths";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import * as Yup from "yup";

const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  cardNumber: Yup.string().required("Card number is required"),
  expirationDate: Yup.string().required("Expiration date is required"),
  cvv: Yup.string().required("CVV is required"),
});

interface Props {
  id: string;
}

const Checkout: React.FC<Props> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { checkoutItems, makeOrder } = useAppData();

  const price = Number(id!) || 0;

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);
      const totalAmount = checkoutItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const order = {
        id: generateUniqueId(),
        customerName: values.fullName,
        email: values.email,
        orderDate: new Date().toISOString(),
        status: "Pending",
        totalAmount,
        items: checkoutItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      setTimeout(async () => {
        await makeOrder(order as any);
        enqueueSnackbar("Order placed successfully!", { variant: "success" });
        router.push(paths.app.orders);
        setIsLoading(false);
        removeDataFromLocalStorage("checkoutItems");
      }, 3000);
    } catch (error) {
      enqueueSnackbar("Failed to place order. Please try again.", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f2421] text-white  max-sm:px-4 flex flex-col items-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="relative w-full max-w-2xl p-8 max-h-[90dvh] overflow-y-auto bg-white/10 rounded-lg shadow-lg backdrop-blur-sm"
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
        <h1 className="text-2xl font-semibold text-center mb-8">Checkout</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={CheckoutSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { getFieldProps, isValid, isSubmitting } = formik;
            return (
              <Form className="space-y-6">
                {/* User Details */}
                <div>
                  <h2 className="text-xl font-medium mb-4">
                    Billing Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Input
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        {...getFieldProps("fullName")}
                        {...formikHelper(formik, "fullName")}
                      />
                    </div>

                    <div>
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        {...getFieldProps("email")}
                        {...formikHelper(formik, "email")}
                      />
                    </div>

                    <div>
                      <Input
                        label="Phone Number"
                        type="text"
                        placeholder="+1 234 567 890"
                        {...getFieldProps("phone")}
                        {...formikHelper(formik, "phone")}
                      />
                    </div>

                    <div>
                      <Input
                        label="Shipping Address"
                        type="text"
                        placeholder="1234 Main St, City, Country"
                        {...getFieldProps("address")}
                        {...formikHelper(formik, "address")}
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  <div className=" p-4 rounded-lg shadow-inner">
                    <p className="flex justify-between items-center mb-2">
                      <span>Subtotal</span>
                      <span>${price}</span>
                    </p>
                    <p className="flex justify-between items-center mb-2">
                      <span>Shipping</span>
                      <span>$5.00</span>
                    </p>
                    <p className="flex justify-between items-center font-semibold text-lg mt-4">
                      <span>Total</span>
                      <span>${(price + 5).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h2 className="text-xl font-medium mb-4">
                    Payment Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Input
                        label="Card Number"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        {...getFieldProps("cardNumber")}
                        {...formikHelper(formik, "cardNumber")}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Expiration Date"
                          type="text"
                          placeholder="MM/YY"
                          {...getFieldProps("expirationDate")}
                          {...formikHelper(formik, "expirationDate")}
                        />
                      </div>

                      <div>
                        <Input
                          label="CVV"
                          type="number"
                          placeholder="123"
                          {...getFieldProps("cvv")}
                          {...formikHelper(formik, "cvv")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="mt-8">
                  <Button
                    type="submit"
                    loading={isLoading}
                    disabled={!isValid || isSubmitting || isLoading}
                  >
                    {isLoading ? "Processing..." : "Place Order"}
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

export default Checkout;
