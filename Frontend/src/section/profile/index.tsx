"use client";

import Loader from "@/component/loader";
import { getCurrentUser } from "@/util/getCurrentUser";
import { useCurrentUser } from "@/util/useCurrentUser";
import { useEffect, useState } from "react";
import ProfileEdit from "./edit";
import ProfileDisplay from "./profile";

// Backend user shape
export interface IUserProfile {
  id: string;
  name: string;
  role: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  about?: string;
  photo?: string;
  coverPhoto?: string;
}

// Frontend normalized shape
export interface User {
  id: string;
  name: string;
  role: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  about: string;
  photo: string;
  coverPhoto: string;
}

const ProfileAndSettings = () => {
  const { data: users, isLoading, isError } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    if (!users || users.length === 0) return;

    console.log("Fetched users:", users);

    // ✅ Get the current user from localStorage token
    const currentUser = getCurrentUser(users) as IUserProfile | undefined;

    if (!currentUser) {
      console.warn("No current user found from token.");
      setProfileData(null);
      return;
    }

    // ✅ Normalize the backend user data for UI
    const normalizedUser: User = {
      id: currentUser.id,
      name:
        currentUser.name ||
        `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() ||
        "Unknown User",
      role: currentUser.role || "Customer",
      userName:
        currentUser.userName ||
        currentUser.email?.split("@")[0] ||
        currentUser.name?.toLowerCase().replace(/\s+/g, "") ||
        "unknown_user",
      firstName:
        currentUser.firstName ||
        currentUser.name?.split(" ")[0] ||
        "NoFirstName",
      lastName:
        currentUser.lastName || currentUser.name?.split(" ")[1] || "NoLastName",
      email: currentUser.email || "unknown@example.com",
      country: currentUser.country || "Not specified",
      about: currentUser.about || "This user hasn't written a bio yet.",
      photo: currentUser.photo || "/placeholder.svg",
      coverPhoto: currentUser.coverPhoto || "/placeholder-cover.svg",
    };

    console.log("✅ Normalized user:", normalizedUser);

    setProfileData(normalizedUser);
  }, [users]);

  // Handlers
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = (newData: User) => {
    setProfileData(newData);
    setIsEditing(false);
  };

  // UI states
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load user data.
      </p>
    );
  if (!profileData)
    return (
      <p className="text-center mt-10 text-gray-400">
        No user data found. Please log in.
      </p>
    );

  // ✅ Render display or edit view
  return isEditing ? (
    <ProfileEdit
      initialData={profileData}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  ) : (
    <ProfileDisplay profileData={profileData} onEdit={handleEdit} />
  );
};

export default ProfileAndSettings;
