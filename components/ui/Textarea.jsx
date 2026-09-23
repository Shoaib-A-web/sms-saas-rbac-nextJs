"use client";

import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
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
          className="ui-label mb-1.5 block"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        className={`min-h-24 w-full resize-y rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] ui-transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-[var(--color-danger)]" : "border-[var(--color-border)]"} ${className}`}
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

export default Textarea;