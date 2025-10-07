"use client";
import axiosInstance from "@/util/axios";
import { useEffect } from "react";

export default function TestCurrentUser() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    axiosInstance
      .get("/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log("User:", res.data))
      .catch((err) =>
        console.error("Error:", err.response?.data || err.message)
      );
  }, []);

  return <p>Check console for user fetch result</p>;
}
