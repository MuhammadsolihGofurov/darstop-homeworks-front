import { TEACHER_ROLE } from "@/utils/const";
import {
  EditAssignmentsTeacherUrl,
  SingleAssignmentStudentUrl,
  SingleAssignmentTeacherUrl,
} from "@/utils/router";
import Link from "next/link";
import React from "react";

export default function AssignmentsStudentCard({ data, role = "" }) {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    // "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    // "bg-orange-500",
  ];

  const circle_colors = ["bg-purple-700", "bg-orange-700"];

  function getRandomColor(colors_arr) {
    return colors_arr[Math.floor(Math.random() * colors_arr.length)];
  }

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200">
      <div
        className={`w-full min-h-[120px] p-5 flex flex-col gap-1 justify-between ${getRandomColor(
          colors
        )} relative z-0 shadow-inner`}
      >
        <div className="flex flex-col">
          <h2 className="line-clamp-1 text-white text-lg font-semibold">
            {data?.title}
          </h2>
          <p className="line-clamp-1 text-white text-sm">{data?.description}</p>
        </div>
        <p className="text-white text-xs">{data?.teacher?.name}</p>

        {/* absolute */}
        <div
          className={`w-14 h-14 ${getRandomColor(
            circle_colors
          )} rounded-full absolute -bottom-7 right-5 text-xl uppercase text-white flex items-center justify-center font-semibold`}
        >
          {data?.title?.[0]}
        </div>
      </div>
      <div className="flex flex-col justify-end gap-1 h-[160px]">
        <div className="border flex items-center justify-end gap-2 border-t-gray-200 p-3">
          <Link href={`${SingleAssignmentStudentUrl}?id=${data?._id}`}>
            <a
              role="link"
              className="cursor-pointer group"
              title={`Solo detail  ${data?.title}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_31_35)">
                  <path
                    d="M0.666504 8.00002C0.666504 8.00002 3.33317 2.66669 7.99984 2.66669C12.6665 2.66669 15.3332 8.00002 15.3332 8.00002C15.3332 8.00002 12.6665 13.3334 7.99984 13.3334C3.33317 13.3334 0.666504 8.00002 0.666504 8.00002Z"
                    stroke="#222222"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-main"
                  />
                  <path
                    d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                    stroke="#222222"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-main"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_31_35">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
