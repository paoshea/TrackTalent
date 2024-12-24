import { useState } from "react";
import { X, Plus } from "lucide-react";
import type { JobFormData, JobSalary } from "../../../types/jobs";

interface JobCompensationProps {
  data: JobFormData;
  onChange: <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => void;
  errors: Record<string, string>;
}

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
] as const;

export function JobCompensation({
  data,
  onChange,
  errors,
}: JobCompensationProps) {
  const [newBenefit, setNewBenefit] = useState("");

  const handleSalaryChange = (
    field: keyof JobSalary,
    value: string | number,
  ) => {
    onChange("compensation", {
      ...data.compensation,
      salary: {
        ...data.compensation.salary,
        [field]: field === "currency" ? value : Number(value),
      },
    });
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      onChange("benefits", [...data.benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    onChange(
      "benefits",
      data.benefits.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Compensation</h3>
        <p className="mt-1 text-sm text-gray-500">
          Define the compensation package for this position
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="salary-min"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Salary
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="salary-min"
              name="salary-min"
              value={data.compensation.salary.min}
              onChange={(e) => handleSalaryChange("min", e.target.value)}
              className={`
                block w-full rounded-md shadow-sm sm:text-sm
                ${
                  errors["compensation.salary.min"]
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }
              `}
            />
            {errors["compensation.salary.min"] && (
              <p className="mt-2 text-sm text-red-600">
                {errors["compensation.salary.min"]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="salary-max"
            className="block text-sm font-medium text-gray-700"
          >
            Maximum Salary
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="salary-max"
              name="salary-max"
              value={data.compensation.salary.max}
              onChange={(e) => handleSalaryChange("max", e.target.value)}
              className={`
                block w-full rounded-md shadow-sm sm:text-sm
                ${
                  errors["compensation.salary.max"]
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }
              `}
            />
            {errors["compensation.salary.max"] && (
              <p className="mt-2 text-sm text-red-600">
                {errors["compensation.salary.max"]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Currency
          </label>
          <div className="mt-1">
            <select
              id="currency"
              name="currency"
              value={data.compensation.salary.currency}
              onChange={(e) => handleSalaryChange("currency", e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol}) - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Benefits
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddBenefit()}
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add a benefit..."
            />
            <button
              type="button"
              onClick={handleAddBenefit}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.benefits.map((benefit, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {benefit}
                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(index)}
                  className="ml-1 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
