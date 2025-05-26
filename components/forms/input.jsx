import React from "react";
import { useIntl } from "react-intl";

export default function Input({
  type,
  placeholder,
  name,
  title,
  required,
  register = () => {},
  validation,
  noSelected = false,
  options = [],
}) {
  const intl = useIntl();

  if (type === "radio") {
    return (
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium">{title}</span>
        <div className="flex flex-row gap-5">
          {options.map((option, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name={name}
                value={option.value}
                disabled={noSelected}
                {...register(name, validation)}
                className="accent-main"
              />
              <span className="pb-1">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <label className="flex flex-col gap-1 w-full sm:bg-transparent bg-white rounded-full">
      <span className="text-sm font-normal text-primary pl-6">{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
        autoComplete="off"
        disabled={noSelected}
        className="rounded-md py-3 px-6 flex-1 border border-gray-200 placeholder:font-medium focus:outline-main placeholder:text-primary placeholder:text-opacity-25"
        {...register(name, validation)}
      />
    </label>
  );
}
