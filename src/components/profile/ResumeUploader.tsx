import React from "react";
import { Upload, FileText, Loader } from "lucide-react";
import { useResumeUpload } from "../../hooks/useResumeUpload";

export function ResumeUploader() {
  const { handleUpload, uploading, parsing, error } = useResumeUpload();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await handleUpload(file);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Resume</h3>
          <p className="mt-1 text-sm text-gray-600">
            Upload your resume to automatically fill your profile
          </p>
        </div>
        <FileText className="h-8 w-8 text-gray-400" />
      </div>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      <div className="relative">
        <label
          className={`
          flex justify-center px-6 py-4 border-2 border-dashed rounded-lg
          ${uploading || parsing ? "border-gray-300 bg-gray-50" : "border-gray-300 hover:border-indigo-500"}
          transition-colors duration-200 cursor-pointer
        `}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="text-sm text-gray-600">
              {uploading
                ? "Uploading..."
                : parsing
                  ? "Parsing resume..."
                  : "Click to upload or drag and drop"}
            </div>
            <div className="text-xs text-gray-500">PDF up to 10MB</div>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onFileChange}
            disabled={uploading || parsing}
            className="hidden"
          />
        </label>

        {(uploading || parsing) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
