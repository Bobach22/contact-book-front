import { ErrorOption } from "react-hook-form";

export function addServerErrors<T>(
    errors: { [P in keyof T]?: string },
    setError: (
      fieldName: keyof T,
      error: ErrorOption
    ) => void
  ) {
    return Object.keys(errors).forEach((key) => {
      setError(key as keyof T, {
        type: "server",
        message: errors[key as keyof T]!,
      });
    });
  }