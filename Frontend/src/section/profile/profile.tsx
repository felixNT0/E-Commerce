"use client";
import Header from "@/layout/header";
import { FiEdit } from "react-icons/fi";
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
interface ProfileData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  about: string;
  photo?: string;
  coverPhoto?: string;
}

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
    <div className="dark:bg-gray-900 h-screen dark:text-white">
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <div className="w-full border p-3">
          <div className="relative pb-0 ">
            {/* Cover Image */}
            <div className="h-32 bg-[#277b7c] rounded-t-lg ">
              {profileData.coverPhoto && (
                <img
                  src={profileData.coverPhoto || "/placeholder.svg"}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              )}
            </div>

            {/* Profile Picture and Edit Button */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-2 relative z-10 gap-4 sm:gap-0 ">
              <div className="flex items-end space-x-4 ">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileData.photo ? (
                    <img
                      src={profileData.photo || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-400"
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
                <div className="pb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fullName}
                  </h1>
                  <p className="text-gray-600">@{profileData.username}</p>
                </div>
              </div>
              <button
                //   variant="outline"
                //   size="sm"
                className="mb-2 border py-2 px-3 text-sm rounded-md font-semibold flex items-center justify-center gap-1 sm:text-[12px]  "
                onClick={onEdit}
              >
                <FiEdit className="w-4 h-4 font-semibold" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="pt-6">
            <div className="space-y-4">
              {/* Bio Section */}
              {profileData.about && (
                <div>
                  <p className="text-gray-700 leading-relaxed dark:text-gray-400">
                    {profileData.about}
                  </p>
                </div>
              )}

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                {/* <Badge variant="secondary">Available for work</Badge>
              <Badge variant="outline">Remote</Badge>
              <Badge variant="outline">Full-time</Badge> */}
              </div>

              {/* <Separator /> */}

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <IoMailOutline className="w-4 h-4" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <IoLocationOutline className="w-4 h-4" />
                    <span className="text-sm">{profileData.country}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <IoCalendarOutline className="w-4 h-4" />
                    <span className="text-sm">Joined March 2020</span>
                  </div>
                </div>
              </div>

              {/* <Separator /> */}

              {/* Skills Section */}
              {/* <div>
              <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">UI/UX Design</Badge>
                <Badge variant="secondary">Figma</Badge>
                <Badge variant="secondary">Prototyping</Badge>
                <Badge variant="secondary">User Research</Badge>
                <Badge variant="secondary">Design Systems</Badge>
                <Badge variant="secondary">Adobe Creative Suite</Badge>
              </div>
            </div> */}

              {/* <Separator /> */}

              {/* Stats Section */}
              {/* <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">2.4k</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">892</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
