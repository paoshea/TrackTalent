import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { JobSearchOptions, JobType } from "../../types/jobs";

interface JobSearchFiltersProps {
  filters: JobSearchOptions["filters"];
  onChange: (filters: JobSearchOptions["filters"]) => void;
  className?: string;
}

const jobTypes: { value: JobType; label: string }[] = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const departments = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Customer Support",
  "HR",
  "Finance",
  "Legal",
  "Operations",
];

const locations = [
  "Remote",
  "San Francisco, CA",
  "New York, NY",
  "London, UK",
  "Berlin, DE",
  "Toronto, CA",
  "Sydney, AU",
];

const commonSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "AWS",
  "Docker",
  "Kubernetes",
];

export function JobSearchFilters({
  filters,
  onChange,
  className = "",
}: JobSearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<
    NonNullable<JobSearchOptions["filters"]>
  >({});

  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  const handleChange = (
    field: keyof NonNullable<JobSearchOptions["filters"]>,
    value: NonNullable<JobSearchOptions["filters"]>[keyof NonNullable<
      JobSearchOptions["filters"]
    >],
  ) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = localFilters.skills || [];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s: string) => s !== skill)
      : [...currentSkills, skill];
    handleChange("skills", newSkills);
  };

  const clearFilters = () => {
    const emptyFilters: JobSearchOptions["filters"] = {};
    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(
    (value) =>
      value !== undefined && (Array.isArray(value) ? value.length > 0 : true),
  );

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Job Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Job Type
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    const currentTypes = localFilters.type || [];
                    const newTypes = currentTypes.includes(type.value)
                      ? currentTypes.filter((t) => t !== type.value)
                      : [...currentTypes, type.value];
                    handleChange("type", newTypes);
                  }}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-md
                    ${
                      (localFilters.type || []).includes(type.value)
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }
                    border border-gray-300
                  `}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              value={(localFilters.department || [])[0] || ""}
              onChange={(e) =>
                handleChange(
                  "department",
                  e.target.value ? [e.target.value] : [],
                )
              }
              className="
                mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                sm:text-sm rounded-md
              "
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              value={(localFilters.location || [])[0] || ""}
              onChange={(e) =>
                handleChange("location", e.target.value ? [e.target.value] : [])
              }
              className="
                mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                sm:text-sm rounded-md
              "
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Salary Range */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Salary Range
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.salary?.min ?? ""}
                  onChange={(e) =>
                    handleChange("salary", {
                      ...localFilters.salary,
                      min: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="
                    block w-full border-gray-300 rounded-md shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  "
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max"
                  value={localFilters.salary?.max ?? ""}
                  onChange={(e) =>
                    handleChange("salary", {
                      ...localFilters.salary,
                      max: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="
                    block w-full border-gray-300 rounded-md shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  "
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium text-gray-700">Skills</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {commonSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`
                    inline-flex items-center px-3 py-1.5 rounded-full text-sm
                    font-medium border
                    ${
                      (localFilters.skills || []).includes(skill)
                        ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  {skill}
                  {(localFilters.skills || []).includes(skill) && (
                    <X className="ml-1.5 h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
