"use client";

export default function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) {
  return (
    <label
      className={`flex items-center justify-between gap-4 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
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

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full ui-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${checked ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-strong)]"}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm ui-transition ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </label>
  );
}