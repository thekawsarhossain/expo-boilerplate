import { isAxiosError } from "axios";

type ErrorResponseBody = {
  error?: string;
  message?: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isNetworkError() {
    return this.status === undefined;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (isAxiosError<ErrorResponseBody>(error)) {
    const body = error.response?.data;
    const message = body?.error ?? body?.message ?? error.message;
    return new ApiError(message, error.response?.status, body);
  }

  return new ApiError(error instanceof Error ? error.message : "Something went wrong");
}

export function getErrorMessage(error: unknown): string {
  const apiError = toApiError(error);
  return apiError.isNetworkError
    ? "Can't reach the server. Check your connection and try again."
    : apiError.message;
}
