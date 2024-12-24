import { useState } from "react";
import { useApplicationSubmit } from "../../../hooks/useApplicationSubmit";
import {
  useFormValidation,
  type ValidationRule,
  type ValidationRules,
} from "../../../hooks/useFormValidation";
import type { ApplicationData } from "../../../hooks/useApplicationSubmit";

interface ApplicationFormProps {
  jobId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const validationRules = {
  jobId: ((value: ApplicationData["jobId"]) => {
    return !value ? "Job ID is required" : "";
  }) satisfies ValidationRule<ApplicationData["jobId"]>,

  coverLetter: ((value: ApplicationData["coverLetter"]) => {
    return !value ? "Cover letter is required" : "";
  }) satisfies ValidationRule<ApplicationData["coverLetter"]>,

  resumeUrl: ((value: ApplicationData["resumeUrl"]) => {
    return !value ? "Resume is required" : "";
  }) satisfies ValidationRule<ApplicationData["resumeUrl"]>,

  questions: ((_value: ApplicationData["questions"]) => {
    return ""; // Optional field
  }) satisfies ValidationRule<ApplicationData["questions"]>,

  skills: ((_value: ApplicationData["skills"]) => {
    return ""; // Optional field
  }) satisfies ValidationRule<ApplicationData["skills"]>,
} satisfies ValidationRules<ApplicationData>;

export function ApplicationForm({
  jobId,
  onSuccess,
  onCancel,
  className = "",
}: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    jobId,
    coverLetter: "",
    resumeUrl: "",
    questions: {},
    skills: [],
  });

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const { submit, isSubmitting, progress } = useApplicationSubmit({
    onSuccess: () => {
      setSubmitState("success");
      onSuccess?.();
    },
    onError: () => {
      setSubmitState("error");
    },
  });

  const { errors, validateField, validateForm } =
    useFormValidation<ApplicationData>(validationRules);

  const submitApplication = async () => {
    if (isSubmitting) return;

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitState("submitting");
    try {
      await submit(formData);
    } catch (error) {
      setSubmitState("error");
      console.error("Failed to submit application:", error);
    }
  };

  const handleChange = <K extends keyof ApplicationData>(
    field: K,
    value: ApplicationData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <label
          htmlFor="coverLetter"
          className="block text-sm font-medium text-gray-700"
        >
          Cover Letter
        </label>
        <div className="mt-1">
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
              ${errors.coverLetter ? "border-red-300" : ""}
            `}
            value={formData.coverLetter}
            onChange={(e) => handleChange("coverLetter", e.target.value)}
          />
          {errors.coverLetter && (
            <p className="mt-2 text-sm text-red-600">{errors.coverLetter}</p>
          )}
        </div>
      </div>

      {/* Resume Upload */}
      <div>
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-gray-700"
        >
          Resume
        </label>
        <div className="mt-1">
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            className={`
              block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100
              ${errors.resumeUrl ? "border-red-300" : ""}
            `}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Handle file upload
                console.log("File selected:", file);
              }
            }}
          />
          {errors.resumeUrl && (
            <p className="mt-2 text-sm text-red-600">{errors.resumeUrl}</p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {submitState === "submitting" && progress > 0 && (
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submitApplication}
          disabled={isSubmitting}
          className={`
            inline-flex justify-center px-4 py-2 text-sm font-medium text-white
            bg-indigo-600 border border-transparent rounded-md shadow-sm
            hover:bg-indigo-700 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-indigo-500
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
