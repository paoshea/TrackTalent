import type { JobFormData } from "../../../types/jobs";

interface JobBasicInfoProps {
  data: Pick<
    JobFormData,
    "title" | "description" | "department" | "location" | "type"
  >;
  onChange: <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) => void;
  errors: Record<string, string>;
}

const jobTypes = ["full-time", "part-time", "contract", "internship"] as const;

const departments = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Customer Support",
  "HR",
  "Finance",
  "Legal",
  "Operations",
] as const;

export function JobBasicInfo({ data, onChange, errors }: JobBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Provide the basic details about this position
        </p>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
            className={`
              block w-full rounded-md shadow-sm sm:text-sm
              ${
                errors.title
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }
            `}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-700"
        >
          Department
        </label>
        <div className="mt-1">
          <select
            id="department"
            name="department"
            value={data.department}
            onChange={(e) => onChange("department", e.target.value)}
            className={`
              block w-full rounded-md shadow-sm sm:text-sm
              ${
                errors.department
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }
            `}
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-2 text-sm text-red-600">{errors.department}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Job Type
        </label>
        <div className="mt-1">
          <select
            id="type"
            name="type"
            value={data.type}
            onChange={(e) =>
              onChange("type", e.target.value as JobFormData["type"])
            }
            className={`
              block w-full rounded-md shadow-sm sm:text-sm
              ${
                errors.type
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }
            `}
          >
            <option value="">Select job type</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-2 text-sm text-red-600">{errors.type}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="location"
            name="location"
            value={data.location}
            onChange={(e) => onChange("location", e.target.value)}
            className={`
              block w-full rounded-md shadow-sm sm:text-sm
              ${
                errors.location
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }
            `}
          />
          {errors.location && (
            <p className="mt-2 text-sm text-red-600">{errors.location}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            name="description"
            rows={4}
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
            className={`
              block w-full rounded-md shadow-sm sm:text-sm
              ${
                errors.description
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }
            `}
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
