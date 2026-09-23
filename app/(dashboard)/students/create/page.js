"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function CreateStudentPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    className: "",
    section: "",
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
     * API integration will be added later.
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Add Student"
        description="Create a new student record."
        actions={
          <Link href="/students">
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
          description="Basic student information."
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

            <Input
              label="Email"
              type="email"
              placeholder="student@example.com"
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

            <Input
              label="Date of birth"
              type="date"
              value={form.dob}
              onChange={(event) =>
                updateField(
                  "dob",
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
          </div>
        </Card>

        <Card
          title="Academic Information"
          description="Assign the student to a class and section."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Class"
              value={form.className}
              onChange={(event) =>
                updateField(
                  "className",
                  event.target.value
                )
              }
            >
              <option value="">
                Select class
              </option>

              <option>
                Class 6
              </option>

              <option>
                Class 7
              </option>

              <option>
                Class 8
              </option>

              <option>
                Class 9
              </option>

              <option>
                Class 10
              </option>
            </Select>

            <Select
              label="Section"
              value={form.section}
              onChange={(event) =>
                updateField(
                  "section",
                  event.target.value
                )
              }
            >
              <option value="">
                Select section
              </option>

              <option>A</option>
              <option>B</option>
              <option>C</option>
            </Select>
          </div>
        </Card>

        <Card
          title="Contact Information"
          description="Student address."
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
          <Link href="/students">
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
            Create Student
          </Button>
        </div>
      </form>
    </div>
  );
}