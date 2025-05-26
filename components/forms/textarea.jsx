import React from "react";
import { useIntl } from "react-intl";

export default function Textarea({
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

  return (
    <label className="flex flex-col gap-1 w-full sm:bg-transparent bg-white rounded-full">
      <span className="text-sm font-normal text-primary pl-6">{title}</span>
      <textarea
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
        autoComplete="off"
        disabled={noSelected}
        className="rounded-md py-3 px-6 flex-1 border border-gray-200 placeholder:font-medium focus:outline-main placeholder:text-primary placeholder:text-opacity-25 min-h-[120px] resize-none"
        {...register(name, validation)}
      />
    </label>
  );
}
