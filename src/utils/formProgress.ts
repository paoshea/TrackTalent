import type { FormStep } from "../types/form";

export function calculateProgress<T>(
  steps: FormStep<T>[],
  completedSteps: Set<number>,
): number {
  if (steps.length === 0) return 0;
  return Math.round((completedSteps.size / steps.length) * 100);
}

export function isStepAccessible<T>(
  targetStep: number,
  currentStep: number,
  completedSteps: Set<number>,
  steps: FormStep<T>[],
): boolean {
  if (targetStep === 0) return true;
  if (targetStep === currentStep + 1) return completedSteps.has(currentStep);
  if (steps[targetStep]?.isOptional) return true;
  return targetStep <= currentStep || completedSteps.has(targetStep - 1);
}
