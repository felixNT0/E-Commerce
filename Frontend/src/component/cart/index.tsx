"use client";

import { useAppData } from "@/context";
import routes from "@/routes";
import { ProductItem } from "@/types/product";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Button from "../button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { cartData, updateCartData, removeFromCart, addToCheckout } =
    useAppData();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const cartItems = Array.isArray(cartData) ? cartData : [];
  const router = useRouter();

  useEffect(() => {
    setSelectedItems(cartItems.map((item) => item.id));
  }, [cartItems]);

  const handleToggleSelect = (productId: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const increaseQuantity = (productId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartData(updatedCart);
  };

  const decreaseQuantity = (productId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartData(updatedCart);
  };

  const closeModal = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  const total = useMemo(
    () =>
      cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems, selectedItems]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed right-0 top-0 h-full w-screen max-w-md bg-white z-50 shadow-lg overflow-y-auto"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-[#216869]">
                  Shopping cart
                </h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ul
                role="list"
                className="mt-8 divide-y divide-gray-200 flex-1 overflow-y-auto"
              >
                {cartItems.map((item: ProductItem & { quantity: number }) => (
                  <li key={item.id} className="flex gap-1 items-start py-6">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => {
                        handleToggleSelect(item.id);
                      }}
                      className="mr-2 form-checkbox !text-[#216869] focus:!ring-[#216869] border-gray-300"
                    />
                    <div className="h-24 w-24 p-1 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <Link
                        href={`${routes.app.product}/${item.id}`}
                        className="truncate text-base font-medium text-[#216869]"
                      >
                        <h3 className="!truncate">{item.name}</h3>
                      </Link>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.category}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center">
                          <Button
                            onClick={() => decreaseQuantity(item.id)}
                            className="!px-2 !py-1 text-sm bg-gray-500 hover:bg-gray-600 rounded"
                          >
                            -
                          </Button>
                          <span className="mx-2 text-gray-500">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => increaseQuantity(item.id)}
                            className="!px-2 !py-1 text-sm bg-gray-500 hover:bg-gray-600 rounded"
                          >
                            +
                          </Button>
                        </div>

                        <div className="flex items-center">
                          <Button
                            onClick={() => removeFromCart(item.id)}
                            className="font-medium bg-transparent hover:bg-transparent text-red-600 hover:text-red-500"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 py-6">
                <div className="flex justify-between text-base font-medium text-[#216869]">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Button
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-[#216869] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#1b554f] transition"
                    disabled={
                      selectedItems.length === 0 || cartItems.length === 0
                    }
                    onClick={() => {
                      router.push(`${routes.app.checkout}/${total.toFixed(2)}`);
                      addToCheckout(
                        cartItems.filter((cart) =>
                          selectedItems.includes(cart.id)
                        )
                      );
                    }}
                  >
                    Checkout
                  </Button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-medium text-[#216869] hover:text-[#1b554f]"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
