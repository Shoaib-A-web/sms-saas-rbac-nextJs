"use client";

import { forwardRef } from "react";

const Checkbox = forwardRef(function Checkbox(
  {
    label,
    description,
    id,
    ...props
  },
  ref
) {
  return (
    <label
      htmlFor={id}
      className="
        flex
        cursor-pointer
        items-start
        gap-3
      "
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="
          mt-0.5
          size-4
          cursor-pointer
          accent-[var(--color-primary)]
        "
        {...props}
      />

      <span>
        {label && (
          <span className="block text-sm font-medium">
            {label}
          </span>
        )}

        {description && (
          <span className="mt-0.5 block text-xs text-[var(--color-foreground-muted)]">
            {description}
          </span>
        )}
      </span>
    </label>
  );
});

export default Checkbox;