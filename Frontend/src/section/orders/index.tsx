"use client";

import Button from "@/component/button";
import { useAppData } from "@/context";
import Header from "@/layout/header";
import routes from "@/routes";
import Link from "next/link";
import React from "react";

const OrderList: React.FC = () => {
  const { orders, cancelOrder } = useAppData();

  const calculateTotalPrice = (items: { price: number }[]) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center mb-6 max-sm:mb-1 justify-between">
          <h1 className="text-3xl font-bold text-gray-900 ">Order List</h1>{" "}
          <h5 className="text-xl font-bold text-gray-900">
            Total Price: $
            {orders
              .reduce(
                (total, order) => total + calculateTotalPrice(order.items),
                0
              )
              .toFixed(2)}
          </h5>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 mt-3">No orders found.</p>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {orders.map((order) => (
              <li key={order.id} className="py-5">
                <div className="flex flex-col gap-y-4 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex max-md:flex-col justify-between gap-x-6 pt-4"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-20 w-20 flex-none rounded bg-gray-50"
                          src={item.imageUrl || "/placeholder.jpg"}
                          alt={item.productName || "Product Image"}
                        />
                        <div className="min-w-0 flex-auto">
                          <Link
                            href={`${routes.app.product}/${item.productId}`}
                          >
                            <p className="text-sm font-semibold leading-6 hover:underline text-[#216869]">
                              {item.productName || "Product Name"}
                            </p>
                          </Link>
                          <p className="mt-1 truncate text-xs leading-5 text-[#216869]">
                            Order Date:{" "}
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Amount: ${item.price.toFixed(2)}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Status:{" "}
                          <span
                            className={`font-medium ${
                              order.status === "Pending"
                                ? "text-yellow-500"
                                : order.status === "Shipped"
                                ? "text-blue-500"
                                : order.status === "Delivered"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <Button
                            onClick={() => cancelOrder(order.id)}
                            className="bg-red-500 text-white !px-3 !py-1 rounded hover:bg-red-600"
                          >
                            Cancel Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default OrderList;
