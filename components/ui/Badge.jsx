const variants = {
  default: `bg-[var(--color-surface-muted)] text-[var(--color-foreground)]`,

  primary: `bg-[var(--color-primary)] text-[var(--color-primary-foreground)]`,

  success: `bg-[var(--color-success)] text-white`,

  warning: `bg-[var(--color-warning)] text-white`,

  danger: `bg-[var(--color-danger)] text-white`,

  info: `bg-[var(--color-info)] text-white`,
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}