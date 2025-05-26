import React, { useRef } from "react";
import { useController } from "react-hook-form";
import { useIntl } from "react-intl";

const FilesUpload = ({ name, control }) => {
  const intl = useIntl();
  const fileInputRef = useRef(null);
  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    onChange([...value, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition"
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-gray-500">
          <strong>
            {intl.formatMessage({
              id: "Fayllarni shu yerga torting yoki yuklash uchun bosing",
            })}
          </strong>
        </p>
        <p className="text-sm text-gray-400">
          {intl.formatMessage({ id: "Ko‘p fayl tanlash mumkin" })}
        </p>
      </div>

      {/* Selected Files */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 p-1">
          {value.map((file, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-100 rounded-md overflow-hidden px-4 py-2 gap-1"
            >
              <span className="truncate max-w-xs text-xs text-gray-800">
                {file.name ?? file}
              </span>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesUpload;
