import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="relative overflow-y-auto rounded bg-white text-[#216869] p-5 shadow-xl"
        >
          <FaSpinner className="animate-spin text-[30px]" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
