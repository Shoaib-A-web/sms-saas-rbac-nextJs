import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description,
  action,
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="
        mb-4
        flex
        size-12
        items-center
        justify-center
        rounded-[var(--radius-full)]
        bg-[var(--color-surface-muted)]
        text-[var(--color-foreground-muted)]
      ">
        {icon || <Inbox size={22} />}
      </div>

      <h3 className="text-sm font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-md text-sm text-[var(--color-foreground-muted)]">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}