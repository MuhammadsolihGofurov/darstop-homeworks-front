"use client";
import React, { useState } from "react";
import { useIntl } from "react-intl";

export default function GradeModal({ isOpen, onClose, onSubmit, submission }) {
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const intl = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ feedback, grade, submissionId: submission?._id });
    setFeedback("");
    setGrade("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-5">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {intl.formatMessage({ id: "Give Feedback & Grade" })}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {intl.formatMessage({ id: "Feedback" })}
            </label>
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {intl.formatMessage({ id: "Grade" })}
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              min="0"
              max="100"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {intl.formatMessage({ id: "submit" })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
