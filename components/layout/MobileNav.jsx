"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Settings,
} from "lucide-react";

const navigation = [
  {
    label: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Students",
    href: "/students",
    icon: GraduationCap,
  },

  {
    label: "Teachers",
    href: "/teachers",
    icon: Users,
  },

  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-[var(--color-border)]
        ui-glass
        lg:hidden
      "
    >
      <div className="grid grid-cols-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(
              `${item.href}/`
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                flex-col
                items-center
                gap-1
                px-2
                py-2
                text-[10px]
                font-medium
                ui-transition
                ${
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-foreground-muted)]"
                }
              `}
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}