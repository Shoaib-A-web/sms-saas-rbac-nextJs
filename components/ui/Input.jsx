"use client";

import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    id,
    className = "",
    ...props
  },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="ui-label mb-1.5 block text-[var(--color-foreground)]"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        className={`h-10 w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] ui-transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-[var(--color-danger)]" : "border-[var(--color-border)]"} ${className}`}
        {...props}
      />

      {error && (
        <p className="ui-form-error mt-1">
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="mt-1 text-xs text-[var(--color-foreground-muted)]">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;