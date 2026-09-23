"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function CreateTeacherPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    joiningDate: "",
    gender: "",
    address: "",
  });

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setLoading(true);

    /*
     * API integration later.
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Add Teacher"
        description="Create a new teacher or staff record."
        actions={
          <Link href="/teachers">
            <Button variant="outline">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Card
          title="Personal Information"
          description="Basic employee information."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              placeholder="Enter full name"
              required
              value={form.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
            />

            <Select
              label="Gender"
              value={form.gender}
              onChange={(event) =>
                updateField(
                  "gender",
                  event.target.value
                )
              }
            >
              <option value="">
                Select gender
              </option>

              <option value="MALE">
                Male
              </option>

              <option value="FEMALE">
                Female
              </option>

              <option value="OTHER">
                Other
              </option>
            </Select>

            <Input
              label="Email"
              type="email"
              placeholder="teacher@example.com"
              value={form.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
            />

            <Input
              label="Phone"
              placeholder="+91..."
              value={form.phone}
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value
                )
              }
            />
          </div>
        </Card>

        <Card
          title="Employment Information"
          description="Teacher employment details."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Designation"
              placeholder="e.g. Mathematics Teacher"
              value={form.designation}
              onChange={(event) =>
                updateField(
                  "designation",
                  event.target.value
                )
              }
            />

            <Input
              label="Joining date"
              type="date"
              value={form.joiningDate}
              onChange={(event) =>
                updateField(
                  "joiningDate",
                  event.target.value
                )
              }
            />
          </div>
        </Card>

        <Card
          title="Contact Information"
          description="Employee address."
        >
          <Input
            label="Address"
            placeholder="Enter address"
            value={form.address}
            onChange={(event) =>
              updateField(
                "address",
                event.target.value
              )
            }
          />
        </Card>

        <div className="flex justify-end gap-2">
          <Link href="/teachers">
            <Button
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            loading={loading}
          >
            Create Teacher
          </Button>
        </div>
      </form>
    </div>
  );
}