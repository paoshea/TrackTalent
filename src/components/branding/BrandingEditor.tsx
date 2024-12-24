import React from "react";
import { SketchPicker } from "react-color";
import { useBrandingMutation } from "../../hooks/useBrandingMutation";

export function BrandingEditor() {
  const { theme, updateTheme } = useBrandingMutation();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Brand Customization</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Color
          </label>
          <SketchPicker
            color={theme.primaryColor}
            onChange={(color) => updateTheme({ primaryColor: color.hex })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Secondary Color
          </label>
          <SketchPicker
            color={theme.secondaryColor}
            onChange={(color) => updateTheme({ secondaryColor: color.hex })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <div className="flex items-center space-x-4">
          {theme.logo && (
            <img
              src={theme.logo}
              alt="Company logo"
              className="h-12 w-12 object-contain"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Handle logo upload
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
