import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import { ButtonSpinner } from "../loading";
import Input from "./input";
import { LOCAL_PRIVATE_TOKEN } from "@/utils/const";
import DatePickerUi from "./date-picker-ui";
import MultiSelect from "./multi-select";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import FilesUpload from "./files-upload";
import Textarea from "./textarea";
import { AssignmentTeacherUrl } from "@/utils/router";

export default function EditAssignmentsForm({ old_data }) {
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
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const { data: options } = useSWR([`/user/students`, router.locale], (url) =>
    fetcher(
      url,
      {
        headers: {
          "Accept-Language": router.locale,
        },
      },
      {},
      true
    )
  );

  useEffect(() => {
    if (old_data) {
      setValue("title", old_data.title);
      setValue("description", old_data.description);
      setValue("dueDate", {
        startDate: new Date(old_data.dueDate),
        endDate: new Date(old_data.dueDate),
      });
      //   setValue("assignedTo", old_data.assignedTo); // array of user IDs
      //   setValue("files", old_data.attachments); // array of user IDs
    }
  }, [old_data, setValue]);

  const submitFn = async (data) => {
    const { title, description, dueDate } = data;
    try {
      setReqLoading(true);
      //   const formData = new FormData();

      //   //   if (data.files && data.files.length > 0) {
      //   //     data.files.forEach((file) => {
      //   //       formData.append("attachments", file);
      //   //     });
      //   //   }

      //   formData.append("title", data.title);
      //   formData.append("description", data.description);
      //   formData.append("dueDate", data.dueDate?.startDate);

      const formData = {
        title,
        description,
        dueDate: dueDate,
      };

      //   data.assignedTo.forEach((userId) => {
      //     formData.append("assignedTo", userId);
      //   });

      await axios.patch(`/teacher/assignments/${old_data._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LOCAL_PRIVATE_TOKEN)}`,
        },
      });

      toast.success(intl.formatMessage({ id: "success-updated" }));

      //   reset();
      setTimeout(() => {
        router.push(`${AssignmentTeacherUrl}`);
      }, 500);
    } catch (e) {
      toast.error(
        e?.response?.data?.message?.title ||
          e?.response?.data?.message?.description ||
          e?.response?.data?.message?.dueDate ||
          e?.response?.data?.message?.assignedTo ||
          e?.response?.data?.message?.attachments ||
          e?.response?.data?.message
      );
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white w-11/12 sm:w-[650px]`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 items-start rounded-lg sm:border border-bg-3 sm:py-8 gap-3 sm:px-5">
        <Input
          errors={errors?.name}
          type={"title"}
          register={register}
          name={"title"}
          title={intl.formatMessage({ id: "title" })}
          placeholder={intl.formatMessage({ id: "title" })}
          id={`title`}
          control={control}
          required
          validation={{
            required: intl.formatMessage({ id: "required-name" }),
          }}
        />

        <Input
          errors={errors?.dueDate}
          type={"datetime-local"}
          register={register}
          name={"dueDate"}
          title={intl.formatMessage({ id: "dueDate" })}
          placeholder={intl.formatMessage({ id: "dueDate" })}
          id={`dueDate`}
          control={control}
          required
          validation={{
            required: intl.formatMessage({ id: "required-dueDate" }),
          }}
        />
        
        {/* <DatePickerUi
          errors={errors?.dueDate}
          type={"date"}
          register={register}
          name={"dueDate"}
          title={intl.formatMessage({ id: "dueDate" })}
          placeholder={""}
          id="dueDate"
          required
          validation={{
            required: intl.formatMessage({ id: "Required" }),
          }}
          control={control}
        /> */}

        <div className="sm:col-span-2 col-span-1">
          <Textarea
            errors={errors?.name}
            type={"description"}
            register={register}
            name={"description"}
            title={intl.formatMessage({ id: "description" })}
            placeholder={intl.formatMessage({ id: "description" })}
            id={`description`}
            control={control}
            required
            validation={{
              required: intl.formatMessage({ id: "required-name" }),
            }}
          />
        </div>

        {/* <div className="sm:col-span-2 col-span-1">
          <MultiSelect
            name="assignedTo"
            control={control}
            options={options?.data}
            placeholder={intl.formatMessage({ id: "Select students" })}
          />
        </div>

        <div className="sm:col-span-2 col-span-1">
          <FilesUpload name="files" control={control} />
        </div> */}

        <div className="col-span-1 sm:col-span-2 flex items-center justify-center w-full pt-5">
          <button
            type="submit"
            className={`py-4 font-semibold bg-accent w-3/4 rounded-lg flex items-center justify-center text-center transition-opacity duration-300 ${
              !isValid
                ? "bg-opacity-10 text-accent cursor-not-allowed"
                : "text-white"
            }`}
            disabled={reqLoading || !isValid}
          >
            {reqLoading ? (
              <ButtonSpinner />
            ) : (
              intl.formatMessage({ id: "update" })
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
