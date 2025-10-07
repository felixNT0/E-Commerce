"use client";
import ProfileCard from "@/component/card";
import UserDashboard from "@/component/userDashboard";
import Header from "@/layout/header";
import { FaStar } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { PiMedal } from "react-icons/pi";
interface ProfileData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  about: string;
  photo?: string;
  coverPhoto?: string;
}

const recentOrders = [
  {
    id: "ORD-123",
    image: "/laptop.jpg",
    items: "MacBook Pro",
    status: "Delivered" as const,
    date: "2025-06-26",
    amount: "$2,399",
  },
];

const wishlistItems = [
  {
    id: "ITEM-1",
    name: "iPhone 15 Pro",
    image: "/iphone.jpg",
    price: "$1,099",
    originalPrice: "$1,199",
    inStock: true,
  },
];

const recentReviews = [
  {
    id: "REV-1",
    product: "AirPods Max",
    rating: 5,
    date: "2025-06-20",
    review: "Fantastic sound quality. Worth every penny!",
    helpful: 12,
  },
];

interface ProfileDisplayProps {
  profileData: ProfileData;
  onEdit: () => void;
}

export default function ProfileDisplay({
  profileData,
  onEdit,
}: ProfileDisplayProps) {
  const fullName = `${profileData.firstName} ${profileData.lastName}`;

  return (
    <div className="dark:bg-gray-900 min-h-full dark:text-white">
      {/* Header */}
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        <div className="w-full ">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-[#216869] to-[#49A078] rounded-t-lg">
              {profileData.coverPhoto && (
                <img
                  src={profileData.coverPhoto || "/placeholder.svg"}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              )}
            </div>

            {/* Profile Content */}
            <div className="px-6 pb-6 border border-gray-400 dark:bg-gray-800 rounded-b-lg w-full">
              {/* Profile Picture and Edit Button */}
              <div className=" w-full flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 relative z-10 gap-4 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:gap-2 items-center sm:space-x-6">
                  <div className="w-24 h-24 sm:w-40 sm:h-36 rounded-full border-4 border-white shadow-xl bg-gray-200 flex items-center justify-center  overflow-hidden">
                    {profileData.photo ? (
                      <img
                        src={profileData.photo || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-24 h-24 sm:w-40 sm:h-36 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="pb-4 w-full">
                    <h1 className="text-lg sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {fullName}
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mb-2">
                      @{profileData.userName}
                    </p>
                    <div className="flex flex-col gap-2 justify-center sm:flex-row items-center sm:space-x-3 w-full ">
                      <div className="w-full flex justify-center items-center gap-1 border bg-zinc-400 text-white py-[2px] px-2 rounded-full font-medium">
                        <PiMedal className="text-sm" />
                        <p className="text-[12px]">Gold Member</p>
                      </div>
                      <div className="w-full flex justify-center items-center gap-1 border py-[2px]  rounded-full">
                        <FaStar className="text-sm text-yellow-500" />
                        <p className="text-[12px]">Vip Customer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="mb-2 border py-2 px-3 text-sm rounded-md font-semibold flex items-center justify-center gap-1 sm:text-[12px]  "
                  onClick={onEdit}
                >
                  <FiEdit className="w-4 h-4 font-semibold" />
                  Edit Profile
                </button>
              </div>

              {/* Bio and Contact Info */}
              <div className="mt-6 space-y-6">
                {profileData.about && (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                      {profileData.about}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <HiOutlineMail className="w-5 h-5" />
                    <span className="font-medium text-[14px] sm:text-sm ">
                      {profileData.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <IoLocationOutline className="w-5 h-5" />
                    <span className="font-medium text-[14px] sm:text-sm ">
                      {profileData.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <IoCalendarOutline className="w-5 h-5" />
                    <span className="font-medium text-[14px] sm:text-sm ">
                      Joined March 2020
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="pt-9">
            <ProfileCard />
          </div>

          {/* User Dashboard */}
          <div className="pt-9">
            <UserDashboard
              recentOrders={recentOrders}
              wishlistItems={wishlistItems}
              recentReviews={recentReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
