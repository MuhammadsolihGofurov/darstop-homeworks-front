import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import axios, { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";
import { ButtonSpinner } from "../loading";
import Input from "./input";
import {
  LOCAL_PRIVATE_ROLE,
  LOCAL_PRIVATE_TOKEN,
  STUDENT_ROLE,
  TEACHER_ROLE,
} from "@/utils/const";
import Link from "next/link";
import { DashboardStudentsUrl, DashboardTeachersUrl } from "@/utils/router";

export default function LoginForm({}) {
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
      email: "",
      password: "",
      role: "",
    },
  });

  const submitFn = async (data) => {
    try {
      setReqLoading(true);

      const response = await axios.post("/auth/login", data);

      localStorage.setItem(LOCAL_PRIVATE_TOKEN, response?.data?.data?.token);
      localStorage.setItem(LOCAL_PRIVATE_ROLE, data.role);

      toast.success(intl.formatMessage({ id: "success-login" }));

      reset();
      setTimeout(() => {
        if (data.role == STUDENT_ROLE) {
          router.push(DashboardStudentsUrl);
        } else {
          router.push(DashboardTeachersUrl);
        }
      }, 500);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white w-11/12 sm:w-[400px]`}
    >
      <div className="flex flex-col items-start rounded-lg sm:border border-bg-3 py-8 gap-3 sm:px-5">
        <div className="flex flex-col w-full items-center text-center gap-2 pb-3">
          <h4 className="text-xl font-medium text-primary">
            {intl.formatMessage({ id: "login" })}
          </h4>
          <p className="text-gray-500 md:w-3/4 text-base leading-5">
            {intl.formatMessage({ id: "login-body" })}
          </p>
        </div>

        <Input
          control={control}
          errors={errors?.email}
          type={"email"}
          register={register}
          name={"email"}
          title={""}
          placeholder={intl.formatMessage({ id: "email" })}
          id={`email`}
          required
          validation={{
            required: intl.formatMessage({ id: "required-email" }),
          }}
        />

        <Input
          control={control}
          errors={errors?.password}
          type={"password"}
          register={register}
          name={"password"}
          title={""}
          placeholder={intl.formatMessage({ id: "password" })}
          id={`password`}
          required
          validation={{
            required: intl.formatMessage({ id: "required-email" }),
          }}
        />

        <Input
          errors={errors?.role}
          type={"radio"}
          register={register}
          name={"role"}
          title={""}
          placeholder={intl.formatMessage({ id: "role" })}
          id={`role`}
          required
          control={control}
          validation={{
            required: intl.formatMessage({ id: "required-role" }),
          }}
          options={[
            { label: "Student", value: STUDENT_ROLE },
            { label: "Teacher", value: TEACHER_ROLE },
          ]}
        />

        <div className="flex gap-5 sm:gap-1 items-center justify-center sm:flex-row col-span-1 w-full pt-5">
          <button
            type="submit"
            className={`py-4 font-semibold  bg-accent w-3/4 rounded-lg flex items-center justify-center text-center transition-opacity duration-300 ${
              !isValid
                ? "bg-opacity-10 text-accent cursor-not-allowed"
                : "text-white"
            }`}
            disabled={reqLoading || !isValid}
          >
            {reqLoading ? (
              <ButtonSpinner />
            ) : (
              intl.formatMessage({ id: "login" })
            )}
          </button>
        </div>

        <p className="text-center w-full">
          <span>{intl.formatMessage({ id: "login-body-for-register" })}</span>{" "}
          <Link href={"/register"}>
            <span className="text-main">
              {intl.formatMessage({ id: "register" })}
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
}
