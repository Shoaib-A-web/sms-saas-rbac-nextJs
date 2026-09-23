import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const teacher = {
  id: "1",
  emp_id: "EMP-1001",
  name: "Rahul Verma",
  email: "rahul@example.com",
  phone: "+91 9876543210",
  designation:
    "Mathematics Teacher",
  joiningDate: "10 June 2022",
  gender: "Male",
  status: "ACTIVE",
  address:
    "Patna, Bihar, India",
};

export default function TeacherDetailsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title={teacher.name}
        description={`Employee ID: ${teacher.emp_id}`}
        actions={
          <>
            <Link href="/teachers">
              <Button variant="outline">
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>

            <Link
              href={`/teachers/${teacher.id}/edit`}
            >
              <Button>
                <Pencil size={16} />
                Edit
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className=" flex size-24 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-2xl font-bold text-[var(--color-primary)] ">
              RV
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {teacher.name}
            </h2>

            <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
              {teacher.emp_id}
            </p>

            <Badge
              variant="success"
              className="mt-3"
            >
              {teacher.status}
            </Badge>
          </div>
        </Card>

        <Card
          title="Personal Information"
          className="lg:col-span-2"
        >
          <InfoGrid
            items={[
              ["Full Name", teacher.name],
              ["Email", teacher.email],
              ["Phone", teacher.phone],
              ["Gender", teacher.gender],
              ["Address", teacher.address],
            ]}
          />
        </Card>

        <Card
          title="Employment Information"
          className="lg:col-span-3"
        >
          <InfoGrid
            items={[
              [
                "Employee ID",
                teacher.emp_id,
              ],
              [
                "Designation",
                teacher.designation,
              ],
              [
                "Joining Date",
                teacher.joiningDate,
              ],
              [
                "Status",
                teacher.status,
              ],
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

function InfoGrid({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="text-xs text-[var(--color-foreground-muted)]">
            {label}
          </p>

          <p className="mt-1 text-sm font-medium">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}