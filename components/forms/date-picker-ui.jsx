"use client";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { useIntl } from "react-intl";

const Datepicker = dynamic(() => import("react-tailwindcss-datepicker"), {
  ssr: false, // ✅ Serverda yuklanmaydi
});

export default function DatePickerUi({
  name,
  title,
  required,
  register = () => {},
  validation,
  noSelected = false,
  errors,
  control,
  minDate,
}) {
  const [mounted, setMounted] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <label
      className="flex flex-col gap-1 data-picker w-full relative z-[1]"
      htmlFor={name}
    >
      <span className="text-sm font-normal text-primary pl-6">{title}</span>
      <span className="w-full relative z-0">
        {/* <span className="absolute top-2/4 -translate-y-2/4 left-6 z-[1]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.25V5.25M6 2.25V5.25M3 8.25H15M8.25 11.25H9V13.5M4.5 3.75H13.5C14.3284 3.75 15 4.42157 15 5.25V14.25C15 15.0784 14.3284 15.75 13.5 15.75H4.5C3.67157 15.75 3 15.0784 3 14.25V5.25C3 4.42157 3.67157 3.75 4.5 3.75Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span> */}
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => (
            <Datepicker
              value={field.value}
              asSingle={true}
              useRange={false}
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              onChange={(date) => {
                field.onChange(date);
              }}
              minDate={minDate ?? new Date()}
              disabled={noSelected}
              required={required}
              lightMode={true}
              primaryColor="blue"
              inputClassName="w-full py-3 pl-6 pr-6 rounded-md border border-gray-200 bg-white text-primary"
            />
          )}
        />
      </span>
      {errors?.message && (
        <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
      )}
    </label>
  );
}
