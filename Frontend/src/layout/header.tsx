"use client";

import CartDrawer from "@/component/cart";
import NotificationDrawer from "@/component/notification";
import ThemeToggle from "@/component/theme/ThemeToggle";
import { useAppData } from "@/context";
import routes from "@/routes";
import { getStoredJSONValuesFromLocalStorage } from "@/util/helper";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const { cartData, logout } = useAppData();

  const currentUser = getStoredJSONValuesFromLocalStorage("currentUser");

  const notificationsCount = 5;
  const cartItemsCount = cartData?.length;

  useEffect(() => {
    const checkUser = async () => {
      setIsLoggedIn(!!currentUser);
    };
    checkUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotificationDrawer = () => {
    setIsNotificationDrawerOpen(!isNotificationDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const handleLogout = async () => {
    logout();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-[#216869] text-white  top-0 sticky z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-gray-300 font-blackOps"
            >
              MyBrand
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={routes.app.about}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1a544f] transition"
            >
              About
            </Link>
            <Link
              href={routes.app.services}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1a544f] transition"
            >
              Services
            </Link>
            <Link
              href={routes.app.contact}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1a544f] transition"
            >
              Contact
            </Link>

            {isLoggedIn && (
              <Link
                href={routes.app.createProduct}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1a544f] transition"
              >
                Create Product
              </Link>
            )}

            <ThemeToggle />

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <div className="relative">
                    <FaBell
                      className="text-white cursor-pointer hover:text-gray-300"
                      size={20}
                      onClick={toggleNotificationDrawer}
                    />
                    {notificationsCount > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {notificationsCount}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <FaShoppingCart
                      className="text-white cursor-pointer hover:text-gray-300"
                      size={20}
                      onClick={toggleCartDrawer}
                    />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <FaUserCircle
                      className="text-white cursor-pointer hover:text-gray-300"
                      size={24}
                      onClick={toggleDropdown}
                    />
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <Link
                              href={routes.app.profile}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={toggleDropdown}
                            >
                              Profile
                            </Link>
                            <Link
                              href={routes.app.orders}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={toggleDropdown}
                            >
                              Orders
                            </Link>
                            <Link
                              href={routes.app.profile}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={toggleDropdown}
                            >
                              Settings
                            </Link>
                            <button
                              onClick={() => {
                                handleLogout();
                                toggleDropdown();
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1a544f] transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 top-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                toggleMenu();
              }
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isMenuOpen ? "100%" : 0 }}
              className={`absolute inset-0 right-0  top-0 h-full max-w-80 bg-[#216869] z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out `}
            >
              {isLoggedIn && (
                <div className="relative mr-4 mt-10 flex justify-end">
                  <FaUserCircle
                    className="text-white cursor-pointer hover:text-gray-300"
                    size={24}
                    onClick={toggleDropdown}
                  />
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={toggleDropdown}
                          >
                            Profile
                          </Link>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={toggleDropdown}
                          >
                            Orders
                          </Link>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={toggleDropdown}
                          >
                            Settings
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              toggleDropdown();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      href={routes.app.createProduct}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                      onClick={toggleMenu}
                    >
                      Create Product
                    </Link>

                    <div
                      onClick={toggleNotificationDrawer}
                      className="cursor-pointer px-3 py-2 flex items-center rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                    >
                      <FaBell className="mr-3" />
                      <span>Notifications</span>
                      {notificationsCount > 0 && (
                        <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
                          {notificationsCount}
                        </span>
                      )}
                    </div>
                    <div
                      onClick={toggleCartDrawer}
                      className="cursor-pointer px-3 py-2 flex items-center rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                    >
                      <FaShoppingCart className="mr-3" />
                      <span>Cart</span>
                      {cartItemsCount > 0 && (
                        <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
                          {cartItemsCount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#1a544f] transition"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={toggleNotificationDrawer}
      />

      <CartDrawer isOpen={isCartDrawerOpen} onClose={toggleCartDrawer} />
    </nav>
  );
};

export default Navbar;
