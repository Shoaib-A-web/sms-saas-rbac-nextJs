import { AlertCircle } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-[var(--color-danger)]">
        <AlertCircle size={22} />
      </div>

      <h3 className="text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-sm text-[var(--color-foreground-muted)]">
        {description}
      </p>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}