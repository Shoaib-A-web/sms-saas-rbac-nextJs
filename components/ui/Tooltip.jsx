"use client";

import { useState } from "react";

export default function Tooltip({
  children,
  content,
}) {
  const [visible, setVisible] =
    useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className="
            pointer-events-none
            absolute
            bottom-[calc(100%+0.5rem)]
            left-1/2
            z-50
            -translate-x-1/2
            whitespace-nowrap
            rounded-[var(--radius-md)]
            bg-[var(--color-foreground)]
            px-2.5
            py-1.5
            text-xs
            text-[var(--color-background)]
            shadow-[var(--shadow-md)]
          "
        >
          {content}
        </div>
      )}
    </div>
  );
}