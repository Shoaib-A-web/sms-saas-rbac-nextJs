export default function Card({
  children,
  title,
  description,
  action,
  className = "",
  glass = false,
}) {
  return (
    <section
      className={`
        rounded-[var(--radius-lg)]
        border
        border-[var(--color-border)]
        ${
          glass
            ? "ui-glass"
            : "bg-[var(--color-surface)]"
        }
        text-[var(--color-foreground)]
        shadow-[var(--shadow-sm)]
        ${className}
      `}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4">
          <div>
            {title && (
              <h2 className="ui-card-title">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-xs text-[var(--color-foreground-muted)]">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      <div className="p-[var(--card-padding)]">
        {children}
      </div>
    </section>
  );
}