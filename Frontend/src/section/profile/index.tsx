"use client";
import { useState } from "react";
import ProfileDisplay from "./profile";
import Settings from "./setting";

const ProfileAndSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "sarahjohnson",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    country: "United States",
    about:
      "Senior Product Designer passionate about creating intuitive user experiences. I love turning complex problems into simple, beautiful solutions that users enjoy.",
    photo: "/placeholder.svg?height=120&width=120",
    coverPhoto: "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newData: any) => {
    setProfileData(newData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Settings
        initialData={profileData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return <ProfileDisplay profileData={profileData} onEdit={handleEdit} />;
};
export default ProfileAndSettings;
