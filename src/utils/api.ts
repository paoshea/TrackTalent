import type { ApiError } from "../types/api";

export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "UNKNOWN_ERROR",
      status: 500,
    };
  }

  return {
    message: "An unknown error occurred",
    code: "UNKNOWN_ERROR",
    status: 500,
  };
}
