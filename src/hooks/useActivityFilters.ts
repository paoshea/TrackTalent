import { useState, useCallback, useMemo } from "react";
import type { ActivityItem, ActivityFilter } from "../types/activity";

export function useActivityFilters(initialActivities: ActivityItem[]) {
  const [filters, setFilters] = useState<ActivityFilter>({});

  const filterActivity = useCallback(
    (activity: ActivityItem, filters: ActivityFilter): boolean => {
      // Type filter
      if (filters.types?.length && !filters.types.includes(activity.type)) {
        return false;
      }

      // Date range filter
      if (filters.startDate && filters.endDate) {
        const activityDate = new Date(activity.timestamp);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);

        if (activityDate < startDate || activityDate > endDate) {
          return false;
        }
      }

      // User filter
      if (filters.userId && activity.userId !== filters.userId) {
        return false;
      }

      // Target type filter
      if (filters.targetType && activity.targetType !== filters.targetType) {
        return false;
      }

      // Target ID filter
      if (filters.targetId && activity.targetId !== filters.targetId) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const contentLower = activity.content?.toLowerCase() || "";
        const titleLower = activity.metadata?.title?.toLowerCase() || "";
        const descriptionLower =
          activity.metadata?.description?.toLowerCase() || "";

        return (
          contentLower.includes(searchLower) ||
          titleLower.includes(searchLower) ||
          descriptionLower.includes(searchLower)
        );
      }

      return true;
    },
    [],
  );

  const applyFilters = useCallback(
    (activities: ActivityItem[]) => {
      return activities.filter((activity) => filterActivity(activity, filters));
    },
    [filters, filterActivity],
  );

  const filteredActivities = useMemo(
    () => applyFilters(initialActivities),
    [applyFilters, initialActivities],
  );

  const updateFilters = useCallback((newFilters: Partial<ActivityFilter>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilters,
    clearFilters,
    filteredActivities,
  };
}
