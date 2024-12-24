import { useEffect, useState, useCallback } from "react";
import { SkillCategory } from "./SkillCategory";
import { LoadingState } from "../shared/LoadingState";
import { SaveIndicator } from "../shared/SaveIndicator";
import { Alert } from "../shared/Alert";
import { supabase } from "../../lib/supabase";

interface Skill {
  id: string;
  name: string;
  rating: number;
  description?: string;
  categoryId: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

interface SkillAssessmentProps {
  userId: string;
  isEditable?: boolean;
  onSave?: () => void;
  className?: string;
}

export function SkillAssessment({
  userId,
  isEditable = false,
  onSave,
  className = "",
}: SkillAssessmentProps) {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const loadSkills = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: skillsData, error: skillsError } = await supabase
        .from("skills")
        .select("*, category:skill_categories(id, name)")
        .eq("user_id", userId);

      if (skillsError) throw skillsError;

      // Group skills by category
      const groupedSkills = skillsData.reduce((acc: SkillCategory[], skill) => {
        const categoryId = skill.category.id;
        const category = acc.find((c: SkillCategory) => c.id === categoryId);

        if (category) {
          category.skills.push({
            id: skill.id,
            name: skill.name,
            rating: skill.rating,
            description: skill.description,
            categoryId,
          });
        } else {
          acc.push({
            id: categoryId,
            name: skill.category.name,
            skills: [
              {
                id: skill.id,
                name: skill.name,
                rating: skill.rating,
                description: skill.description,
                categoryId,
              },
            ],
          });
        }

        return acc;
      }, [] as SkillCategory[]);

      setCategories(groupedSkills);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load skills");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const handleRatingChange = useCallback(
    async (skillId: string, rating: number) => {
      try {
        setSaveStatus("saving");

        const { error: updateError } = await supabase
          .from("skills")
          .update({ rating, updated_at: new Date().toISOString() })
          .eq("id", skillId)
          .eq("user_id", userId);

        if (updateError) throw updateError;

        setCategories((prevCategories) =>
          prevCategories.map((category) => ({
            ...category,
            skills: category.skills.map((skill) =>
              skill.id === skillId ? { ...skill, rating } : skill,
            ),
          })),
        );

        setSaveStatus("saved");
        onSave?.();
      } catch (err) {
        setSaveStatus("error");
        setError(
          err instanceof Error ? err.message : "Failed to update skill rating",
        );
      }
    },
    [userId, onSave],
  );

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className={className}>
      {error && (
        <div className="mb-4">
          <Alert type="error" title="Error" message={error} />
        </div>
      )}

      <div className="space-y-4">
        {categories.map((category) => (
          <SkillCategory
            key={category.id}
            name={category.name}
            skills={category.skills}
            onRatingChange={handleRatingChange}
            isEditable={isEditable}
          />
        ))}
      </div>

      {saveStatus !== "idle" && (
        <div className="mt-4">
          <SaveIndicator status={saveStatus} />
        </div>
      )}
    </div>
  );
}
