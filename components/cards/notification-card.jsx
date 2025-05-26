"use client";
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { formatDate } from "@/utils/more";
import axios, { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";

export default function NotificationCard({ data }) {
  const [isRead, setIsRead] = useState(data?.isRead);
  const [hasSent, setHasSent] = useState(false); // Faqat 1 marta yuborish uchun

  const handleMouseEnter = async () => {
    if (!isRead && !hasSent) {
      try {
        const response = await authAxios.patch(`/user/notifications/${data._id}/read`);
        setIsRead(true);
        setHasSent(true);
        toast.success(response?.data?.data?.message)
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={`w-full max-w-md p-4 border border-gray-200 rounded-2xl shadow-sm flex items-start gap-3 transition hover:shadow-md ${
        isRead ? "bg-gray-200" : "bg-white"
      }`}
    >
      <div className="p-2 rounded-full bg-gray-100">
        <Bell className="text-blue-500 w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900">{data?.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{data?.message}</p>
        <span className="text-xs text-gray-400 mt-2 block">
          {formatDate(data?.createdAt)}
        </span>
      </div>
    </div>
  );
}
