"use client";

export default function Tabs({
  tabs,
  value,
  onChange,
}) {
  return (
    <div
      role="tablist"
      className="flex gap-1 overflow-x-auto border-b border-[var(--color-border)]"
    >
      {tabs.map((tab) => {
        const active = tab.value === value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium ui-transition ${active ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-transparent text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}