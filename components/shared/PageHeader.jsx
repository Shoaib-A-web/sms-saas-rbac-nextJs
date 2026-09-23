export default function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}) {
  return (
    <div className="mb-6">
      {breadcrumbs && (
        <div className="mb-2 flex items-center gap-2 text-xs text-[var(--color-foreground-muted)]">
          {breadcrumbs}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="ui-page-title">
            {title}
          </h1>

          {description && (
            <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}