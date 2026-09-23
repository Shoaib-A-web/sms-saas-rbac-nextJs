"use client";

import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(function Select(
  {
    label,
    error,
    hint,
    id,
    children,
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

      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={`h-10 w-full appearance-none rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-3 pr-10 text-sm text-[var(--color-foreground)] ui-transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-[var(--color-danger)]" : "border-[var(--color-border)]"} ${className}`}
          {...props}
        >
          {children}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-foreground-muted)]"
        />
      </div>

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

export default Select;