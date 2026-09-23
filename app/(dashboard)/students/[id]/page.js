import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const student = {
  id: "1",
  std_id: "STD-1001",
  name: "Aarav Sharma",
  email: "aarav@example.com",
  phone: "+91 9876543210",
  dob: "15 March 2010",
  gender: "Male",
  className: "Class 10",
  section: "A",
  status: "ACTIVE",
  address:
    "Patna, Bihar, India",
};

export default async function StudentDetailsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title={student.name}
        description={`Student ID: ${student.std_id}`}
        actions={
          <>
            <Link href="/students">
              <Button variant="outline">
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>

            <Link
              href={`/students/${student.id}/edit`}
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
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className=" flex size-24 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-2xl font-bold text-[var(--color-primary)] ">
              AS
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {student.name}
            </h2>

            <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
              {student.std_id}
            </p>

            <Badge
              variant="success"
              className="mt-3"
            >
              {student.status}
            </Badge>
          </div>
        </Card>

        <Card
          title="Personal Information"
          className="lg:col-span-2"
        >
          <InfoGrid
            items={[
              ["Full Name", student.name],
              ["Email", student.email],
              ["Phone", student.phone],
              ["Date of Birth", student.dob],
              ["Gender", student.gender],
              ["Address", student.address],
            ]}
          />
        </Card>

        <Card
          title="Academic Information"
          className="lg:col-span-3"
        >
          <InfoGrid
            items={[
              ["Student ID", student.std_id],
              ["Class", student.className],
              ["Section", student.section],
              ["Status", student.status],
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