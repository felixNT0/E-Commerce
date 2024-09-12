import Button from "@/component/button";
import { useAppData } from "@/context";
import { ProductItem } from "@/types/product";
import paths from "@/util/paths";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSnackbar } from "notistack";
import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";

interface ProductCardProps {
  item: ProductItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { cartData, addToCart, removeFromCart } = useAppData();

  const cartItems = Array.isArray(cartData) ? cartData : [];

  const { enqueueSnackbar } = useSnackbar();

  const isInCart = cartItems?.some((product) => product.id === item.id);

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(item.id);
      enqueueSnackbar("Item removed from cart");
    } else {
      addToCart(item);
      enqueueSnackbar("Item added to cart");
    }
  };

  return (
    <motion.div
      key={item.id}
      className="bg-white overflow-hidden p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full relative">
        <Link href={`${paths.app.product}/${item.id}`}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-48 w-full object-cover cursor-pointer rounded-t-md transition-transform transform hover:scale-110"
          />
        </Link>

        <button
          className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Save for later"
          onClick={() => {}}
        >
          <MdFavorite />
        </button>
      </div>
      <div className="flex-1 w-full text-center mt-2">
        <h2 className="text-lg font-semibold truncate">{item.name}</h2>
        <div className="flex items-center justify-between py-0.5 px-1 border-t border-b border-gray-300 my-2">
          <p className="text-gray-500 mb-1 truncate">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </p>
          <p className="text-gray-700 font-bold">${item.price}</p>
        </div>
      </div>
      <Button
        aria-label={isInCart ? "Remove from Cart" : "Add to Cart"}
        onClick={handleToggleCart}
      >
        <BiCartAlt className="mr-4 text-xl" />

        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </Button>
    </motion.div>
  );
};

export default ProductCard;
