"use client";

import Button from "@/component/button";
import Loader from "@/component/loader";
import Modal from "@/component/modal";
import { useAppData } from "@/context";
import Header from "@/layout/header";
import { ProductItem } from "@/types/product";
import paths from "@/util/paths";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { BiCartAlt } from "react-icons/bi";
import { MdFavorite, MdSell } from "react-icons/md";

interface ProductDetailProps {
  id: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const router = useRouter();
  const {
    products,
    addToCart,
    removeFromCart,
    cartData,
    removeProduct,
    addToCheckout,
  } = useAppData();
  const { enqueueSnackbar } = useSnackbar();
  const product = products.find((p) => p.id === id) as ProductItem;
  const [isModalOpen, setModalOpen] = useState(false);

  const cartItems = Array.isArray(cartData) ? cartData : [];
  const isInCart = cartItems?.some((item) => item.id === product.id);

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(id);
      enqueueSnackbar("Item removed from cart");
    } else {
      addToCart(product);
      enqueueSnackbar("Item added to cart");
    }
  };

  const handleEdit = () => {
    router.push(`${paths.app.product}${paths.app.edit}/${id}`);
  };

  const handleDelete = () => {
    setModalOpen(true);
  };

  const confirmDelete = () => {
    removeProduct(id);
    setModalOpen(false);
    enqueueSnackbar("Product deleted");
    router.push(paths.app.home);
  };

  const cancelDelete = () => {
    setModalOpen(false);
  };

  const handAddToCheckout = () => {
    const checkoutProduct = { ...product, quantity: 1 };
    addToCheckout([checkoutProduct]);
  };

  if (!product) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Product Image */}
        <motion.div
          className="flex-1 lg:mr-8 mb-8 lg:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex gap-4">
            {/* <IconButton aria-label="Go Back" onClick={handleGoBack} rounded>
              <BiArrowBack />
            </IconButton> */}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </p>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>

          <div className="flex items-center mb-6 gap-4">
            <Button
              aria-label={isInCart ? "Remove from Cart" : "Add to Cart"}
              onClick={handleToggleCart}
            >
              <BiCartAlt className="mr-4 text-xl" />
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
            <Button
              onClick={() => {
                router.push(`${paths.app.checkout}/${product.price}`);
                handAddToCheckout();
              }}
            >
              <MdSell className="mr-4 text-xl" />
              Buy
            </Button>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              className="ml-4 bg-green-500 outline-none text-white p-2 rounded-full shadow-md hover:bg-green-600"
              aria-label="Save for later"
              onClick={() => {}}
            >
              <MdFavorite />
            </button>
            <Button
              className="max-w-[200px]"
              aria-label="Edit"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className="max-w-[200px]"
              aria-label="Delete"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
          <p className="text-gray-800 my-6">{product.description}</p>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={cancelDelete}>
          <div>
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                aria-label="Cancel"
                onClick={cancelDelete}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button
                aria-label="Confirm Delete"
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductDetail;
