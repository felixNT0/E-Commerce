"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ isOpen, onClose }: Props) {
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
            className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-lg overflow-y-auto"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#216869]">
                Notifications
              </h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-2 text-[#216869]">
                  New comment on your post
                </li>
                <li className="py-2 text-[#216869]">
                  Order #1234 has been shipped
                </li>
                <li className="py-2 text-[#216869]">
                  Reminder: Meeting at 3 PM
                </li>
                <li className="py-2 text-[#216869]">New follower: Jane Doe</li>
                <li className="py-2 text-[#216869]">You have 5 new messages</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
