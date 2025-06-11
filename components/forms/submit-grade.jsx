import axios, { authAxios } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { GradeModal } from "../modals";
import { LOCAL_PRIVATE_TOKEN } from "@/utils/const";

export default function SubmitGrade({ submission }) {
  const router = useRouter();
  const intl = useIntl();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleOpenModal = (submission) => {
    setSelectedSubmission(submission);
    setModalOpen(true);
  };

  const handleSubmitGrade = async ({ submissionId, grade, feedback }) => {
    try {
      await axios.patch(
        `/teacher/submissions/${submissionId}`,
        {
          score: Number(grade),
          feedback,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              LOCAL_PRIVATE_TOKEN
            )}`,
          },
        }
      );

      toast.success(intl.formatMessage({ id: "success" }));

      // setTimeout(() => {
      //   router.r();
      // }, 500);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      toast.error(error?.response?.data?.message);
      //   alert("Bahoni yuborishda xatolik yuz berdi.");
    }
  };

  return (
    <>
      <button
        onClick={() => handleOpenModal(submission)}
        disabled={submission?.status == "graded"}
        className={`px-4 py-2  text-white text-sm rounded  ${
          submission?.status == "graded"
            ? "bg-gray-500"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {intl.formatMessage({ id: "grading" })}
      </button>
      {selectedSubmission && (
        <GradeModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmitGrade}
          submission={selectedSubmission}
        />
      )}
    </>
  );
}
