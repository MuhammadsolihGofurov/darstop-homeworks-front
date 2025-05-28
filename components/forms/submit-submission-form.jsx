import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import axios, { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";
import { ButtonSpinner } from "../loading";
import Input from "./input";
import { LOCAL_PRIVATE_TOKEN, STUDENT_ROLE, TEACHER_ROLE } from "@/utils/const";
import Link from "next/link";
import FilesUpload from "./files-upload";
import { AssignmentStudentUrl } from "@/utils/router";

export default function SubmitSubmissionForm({}) {
  const router = useRouter();
  const intl = useIntl();
  const [reqLoading, setReqLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      attachments: "",
    },
  });

  const assignment_id = router.query.id;

  const submitFn = async (data) => {
    try {
      setReqLoading(true);

      const formData = new FormData();

      // 2. Fayllarni qo‘shish (agar `data.files` array bo‘lsa)
      if (data.attachments && data.attachments.length > 0) {
        data.attachments.forEach((file) => {
          formData.append("attachments", file); // BE expects 'attachments'
        });
      }

      const response = await axios.post(
        `/student/submissions/${assignment_id}/submit`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              LOCAL_PRIVATE_TOKEN
            )}`,
          },
        }
      );

      toast.success(intl.formatMessage({ id: "success-submitted-submisions" }));

      setTimeout(() => {
        router.push(AssignmentStudentUrl);
      }, 500);
    } catch (e) {
      toast.error(
        e?.response?.data?.message?.late ||
          e?.response?.data?.message?.status ||
          e?.response?.data?.message?.role ||
          e?.response?.data?.message
      );
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFn)} role="form" autoComplete="off">
      <div className="flex flex-col items-start rounded-lg w-full gap-2">
        <div className="w-full">
          <FilesUpload name="attachments" control={control} />
        </div>

        <button
          type="submit"
          className={`py-3 font-semibold mx-auto  bg-accent w-full rounded-lg flex items-center justify-center text-center transition-opacity duration-300 ${
            !isValid
              ? "bg-opacity-10 text-accent cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading || !isValid}
        >
          {reqLoading ? (
            <ButtonSpinner />
          ) : (
            intl.formatMessage({ id: "submit" })
          )}
        </button>
      </div>
    </form>
  );
}
