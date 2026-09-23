"use client";

import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  trigger,
  children,
  align = "right",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative inline-block"
    >
      <div
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </div>

      {open && (
        <div
          className={`ui-dropdown-enter absolute top-[calc(100%+0.5rem)] z-50 min-w-48 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-[var(--shadow-lg)] ${align === "left" ? "left-0" : "right-0"}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  icon,
  danger = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-left text-sm ui-transition ${danger ? "text-[var(--color-danger)] hover:bg-red-50 dark:hover:bg-red-950/30" : "text-[var(--color-foreground)] hover:bg-[var(--color-surface-muted)]"}`}
    >
      {icon}
      {children}
    </button>
  );
}