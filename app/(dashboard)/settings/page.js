import Link from "next/link";
import {
  Palette,
  Shield,
  Bell,
  User,
  ChevronRight,
} from "lucide-react";

const settingsItems = [
  {
    title: "Appearance",
    description:
      "Customize theme, colors, fonts, density and interface appearance.",
    href: "/settings/appearance",
    icon: Palette,
  },

  {
    title: "Profile",
    description:
      "Manage your personal profile information.",
    href: "/settings/profile",
    icon: User,
  },

  {
    title: "Security",
    description:
      "Manage password and account security.",
    href: "/settings/security",
    icon: Shield,
  },

  {
    title: "Notifications",
    description:
      "Configure notification preferences.",
    href: "/settings/notifications",
    icon: Bell,
  },
];

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="ui-page-title">
          Settings
        </h1>

        <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
          Manage your account and application
          preferences.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              

            >
              <div className="flex items-start gap-4">
                <div className=" flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] ">
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={18}
                    className=" mt-1 text-[var(--color-foreground-muted)] transition-transform group-hover:translate-x-1 "
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}