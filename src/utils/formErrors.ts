export function formatValidationErrors(
  errors: Record<string, string[]>,
): Record<string, string> {
  return Object.entries(errors).reduce(
    (acc, [field, messages]) => ({
      ...acc,
      [field]: messages[0],
    }),
    {},
  );
}

export function hasErrors(errors: Record<string, string | string[]>): boolean {
  return Object.keys(errors).length > 0;
}

export function getFieldError(
  errors: Record<string, string>,
  field: string,
): string | undefined {
  return errors[field];
}
