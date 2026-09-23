import Link from "next/link";

import {
  GraduationCap,
  Users,
  School,
  UserCheck,
  ArrowUpRight,
  Plus,
} from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    change: "+8.2%",
    icon: GraduationCap,
  },

  {
    title: "Teachers",
    value: "86",
    change: "+4.1%",
    icon: Users,
  },

  {
    title: "Schools",
    value: "12",
    change: "+2.4%",
    icon: School,
  },

  {
    title: "Active Staff",
    value: "142",
    change: "+5.7%",
    icon: UserCheck,
  },
];

const recentStudents = [
  {
    name: "Aarav Sharma",
    className: "Class 10",
    status: "Active",
  },

  {
    name: "Ananya Singh",
    className: "Class 8",
    status: "Active",
  },

  {
    name: "Rahul Kumar",
    className: "Class 9",
    status: "Pending",
  },

  {
    name: "Priya Verma",
    className: "Class 7",
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's what's happening across your school system."
        actions={
          <Button>
            <Plus size={16} />
            Add Student
          </Button>
        }
      />

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {stat.value}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="success">
                      {stat.change}
                    </Badge>

                    <span className="text-xs text-[var(--color-foreground-muted)]">
                      vs last month
                    </span>
                  </div>
                </div>

                <div className=" flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] ">
                  <Icon size={20} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {/* Activity */}
        <Card
          title="Recent Students"
          description="Recently added students"
          action={
            <Link
              href="/students"
              className=" text-xs font-medium text-[var(--color-primary)] "
            >
              View all
            </Link>
          }
          className="xl:col-span-2"
        >
          <div className="divide-y divide-[var(--color-border)]">
            {recentStudents.map(
              (student) => (
                <div
                  key={student.name}
                  className=" flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0 "
                >
                  <div className="flex items-center gap-3">
                    <div className=" flex size-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-semibold text-[var(--color-primary)] ">
                      {student.name
                        .split(" ")
                        .map(
                          (part) =>
                            part[0]
                        )
                        .join("")}
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {student.name}
                      </p>

                      <p className="text-xs text-[var(--color-foreground-muted)]">
                        {student.className}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      student.status ===
                      "Active"
                        ? "success"
                        : "warning"
                    }
                  >
                    {student.status}
                  </Badge>
                </div>
              )
            )}
          </div>
        </Card>

        {/* Quick actions */}
        <Card
          title="Quick Actions"
          description="Common administrative tasks"
        >
          <div className="space-y-2">
            <QuickAction
              href="/students/create"
              title="Add Student"
              description="Register a new student"
            />

            <QuickAction
              href="/teachers/create"
              title="Add Teacher"
              description="Create teacher profile"
            />

            <QuickAction
              href="/master/schools"
              title="Manage Schools"
              description="View schools and branches"
            />

            <QuickAction
              href="/settings/appearance"
              title="Appearance"
              description="Customize application"
            />
          </div>
        </Card>
      </div>

      {/* Welcome card */}
      <Card
        glass
        className="mt-5 overflow-hidden"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="primary">
              SMS SaaS
            </Badge>

            <h2 className="mt-3 text-xl font-bold">
              School management made simpler.
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-[var(--color-foreground-muted)]">
              Manage students, teachers, schools,
              branches and administrative operations
              from one centralized platform.
            </p>
          </div>

          <Link href="/students">
            <Button variant="outline">
              Explore Students
              <ArrowUpRight size={16} />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
}) {
  return (
    <Link
      href={href}
      className=" flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 ui-transition hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-muted)] "
    >
      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-[var(--color-foreground-muted)]">
          {description}
        </p>
      </div>

      <ArrowUpRight
        size={16}
        className="text-[var(--color-foreground-muted)]"
      />
    </Link>
  );
}