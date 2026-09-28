"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  School,
  Settings,
  Database,
  ShieldCheck,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  // {
  //   label: "Dashboard",
  //   href: "/dashboard",
  //   icon: LayoutDashboard,
  // },
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
    label: "Schools",
    href: "/master/schools",
    icon: School,
  },

  {
    label: "Master",
    href: "/master",
    icon: Database,
  },

  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  open = true,
  onClose,
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className=" fixed inset-0 z-40 bg-black/40 lg:hidden "
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-64
          flex-col
          border-r
          border-[var(--color-border)]
          ui-glass
          transform
          transition-transform
          duration-150
          lg:static
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-5">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className=" flex size-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-sm font-bold text-[var(--color-primary-foreground)] ">
              S
            </div>

            <div>
              <p className="text-sm font-bold">
                SMS SaaS
              </p>

              <p className="text-[10px] text-[var(--color-foreground-muted)]">
                School Management
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className=" rounded-[var(--radius-md)] p-1.5 lg:hidden "
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="ui-scroll flex-1 space-y-1 p-3">
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
                onClick={onClose}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-[var(--radius-md)]
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  ui-transition
                  ${
                    active
                      ? `
                        bg-[var(--color-primary)]
                        text-[var(--color-primary-foreground)]
                      `
                      : `
                        text-[var(--color-foreground-muted)]
                        hover:bg-[var(--color-surface-muted)]
                        hover:text-[var(--color-foreground)]
                      `
                  }
                `}
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[var(--color-border)] p-3">
          <div className=" flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] p-3 ">
            <ShieldCheck
              size={20}
              className="text-[var(--color-primary)]"
            />

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">
                Secure Access
              </p>

              <p className="truncate text-[10px] text-[var(--color-foreground-muted)]">
                RBAC enabled
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}