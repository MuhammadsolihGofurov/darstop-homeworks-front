import React, { useState, useRef, useEffect } from "react";
import { useController } from "react-hook-form";

const MultiSelect = ({
  name,
  control,
  options = [],
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const toggleOption = (id) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const getTitleById = (id) => {
    const found = options.find((opt) => opt._id === id);
    return found ? found.name : id;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 cursor-pointer hover:border-indigo-500"
      >
        <div className="flex flex-wrap gap-2">
          {value.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            value.map((v) => (
              <span
                key={v}
                className="bg-indigo-100 text-indigo-700 text-sm px-2 py-1 rounded-full"
              >
                {getTitleById(v)}
              </span>
            ))
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-auto bg-white border border-gray-200 rounded-md shadow-sm max-h-60">
          {options.map((option) => (
            <div
              key={option._id}
              onClick={() => toggleOption(option._id)}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 ${
                value.includes(option._id) ? "bg-indigo-100 font-medium" : ""
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
