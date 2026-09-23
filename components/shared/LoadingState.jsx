import Spinner from "@/components/ui/Spinner";

export default function LoadingState({
  message = "Loading...",
}) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3">
      <Spinner />

      <span className="text-sm text-[var(--color-foreground-muted)]">
        {message}
      </span>
    </div>
  );
}