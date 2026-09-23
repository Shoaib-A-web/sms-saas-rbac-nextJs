import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Layers3,
  Droplets,
  Tags,
  MapPinned,
  ChevronRight,
} from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";

const modules = [
  {
    title: "Schools",
    description: "Manage schools registered in the SaaS.",
    href: "/master/schools",
    icon: Building2,
  },
  {
    title: "Classes",
    description: "Create and manage academic classes.",
    href: "/master/classes",
    icon: GraduationCap,
  },
  {
    title: "Sections",
    description: "Manage class sections and divisions.",
    href: "/master/sections",
    icon: Layers3,
  },
  {
    title: "Blood Groups",
    description: "Manage available blood group values.",
    href: "/master/blood-groups",
    icon: Droplets,
  },
  {
    title: "Categories",
    description: "Manage student categories.",
    href: "/master/categories",
    icon: Tags,
  },
  {
    title: "States",
    description: "Manage states used in addresses.",
    href: "/master/states",
    icon: MapPinned,
  },
];

export default function MasterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Master"
        description="Manage the master data used throughout your school management system."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Link key={module.title} href={module.href} className="group">
              <Card className="h-full transition-transform duration-150 group-hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className=" flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] "
                  >
                    <Icon size={21} />
                  </div>

                  <ChevronRight
                    size={18}
                    className=" text-[var(--color-text-muted)] transition-transform duration-150 group-hover:translate-x-0.5 "
                  />
                </div>

                <div className="mt-5">
                  <h2 className="font-semibold text-[var(--color-text)]">
                    {module.title}
                  </h2>

                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {module.description}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}