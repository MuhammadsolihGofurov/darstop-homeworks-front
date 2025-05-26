import React from "react";
import { useIntl } from "react-intl";

export default function SubmissionCard({ submission }) {
  const intl = useIntl();

  const {
    assignment,
    attachments,
    status,
    score,
    grade,
    feedback,
    submittedAt,
    gradedAt,
  } = submission;

  const getScoreColor = () => {
    if (score >= 90) return "bg-green-100 text-green-700 border-green-400";
    if (score >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-400";
    return "bg-red-100 text-red-700 border-red-400";
  };

  const getStatusBadge = () => {
    return status === "graded" ? (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
        {intl.formatMessage({ id: "submission.status.graded" })}
      </span>
    ) : (
      <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">
        {intl.formatMessage({ id: "submission.status.submitted" })}
      </span>
    );
  };

  return (
    <div className="border rounded-lg shadow p-4 mb-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{assignment?.title}</h3>
        {getStatusBadge()}
      </div>

      <div className="text-sm text-gray-600 mb-2">
        <p>
          <strong>
            {intl.formatMessage({ id: "submission.submittedAt" })}:
          </strong>{" "}
          {new Date(submittedAt).toLocaleString()}
        </p>

        {status === "graded" && (
          <>
            <p>
              <strong>
                {intl.formatMessage({ id: "submission.gradedAt" })}:
              </strong>{" "}
              {new Date(gradedAt).toLocaleString()}
            </p>
            <p>
              <strong>{intl.formatMessage({ id: "submission.grade" })}:</strong>{" "}
              {grade}
            </p>
            <p>
              <strong>
                {intl.formatMessage({ id: "submission.feedback" })}:
              </strong>{" "}
              {feedback}
            </p>
            <p>
              <strong>{intl.formatMessage({ id: "submission.score" })}:</strong>{" "}
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold border rounded ${getScoreColor()}`}
              >
                {score}
              </span>
            </p>
          </>
        )}
      </div>

      {attachments && attachments.length > 0 && (
        <div className="mt-2">
          <a
            href={attachments[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            {intl.formatMessage({ id: "submission.viewAttachment" })}
          </a>
        </div>
      )}
    </div>
  );
}
