"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary: `
    bg-[var(--color-primary)]
    text-[var(--color-primary-foreground)]
    hover:bg-[var(--color-primary-hover)]
  `,

  secondary: `
    bg-[var(--color-surface-muted)]
    text-[var(--color-foreground)]
    hover:bg-[var(--color-border)]
  `,

  outline: `
    bg-transparent
    text-[var(--color-foreground)]
    border border-[var(--color-border)]
    hover:bg-[var(--color-surface-muted)]
  `,

  ghost: `
    bg-transparent
    text-[var(--color-foreground)]
    hover:bg-[var(--color-surface-muted)]
  `,

  danger: `
    bg-[var(--color-danger)]
    text-white
    hover:opacity-90
  `,
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    type = "button",
    className = "",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        whitespace-nowrap
        rounded-[var(--radius-md)]
        font-medium
        ui-transition
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-primary)]
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <Loader2
          size={16}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
});

export default Button;