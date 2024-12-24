import { SketchPicker, ColorResult } from "react-color";
import { useBranding } from "../../hooks/useBranding";
import { supabase } from "../../lib/supabase";

export function BrandingEditor() {
  const { theme, updateTheme, isLoading, error } = useBranding();

  const handleLogoUpload = async (file: File) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.user_metadata.company_id}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("company-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("company-assets").getPublicUrl(filePath);

      await updateTheme({ logo: publicUrl });
    } catch (err) {
      console.error("Failed to upload logo:", err);
    }
  };

  return (
    <div className="space-y-6 bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Brand Customization</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Color
          </label>
          <SketchPicker
            color={theme.primaryColor}
            onChange={(color: ColorResult) =>
              updateTheme({ primaryColor: color.hex })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Secondary Color
          </label>
          <SketchPicker
            color={theme.secondaryColor}
            onChange={(color: ColorResult) =>
              updateTheme({ secondaryColor: color.hex })
            }
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
                handleLogoUpload(file);
              }
            }}
          />
        </div>
      </div>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      {isLoading && (
        <div className="mt-4 text-sm text-gray-500">Saving changes...</div>
      )}
    </div>
  );
}
