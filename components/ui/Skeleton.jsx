export default function Skeleton({
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      className={`ui-skeleton rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] ${className}`}
    />
  );
}