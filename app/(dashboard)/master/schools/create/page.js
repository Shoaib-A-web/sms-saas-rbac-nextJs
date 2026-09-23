"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Input  from "@/components/ui/Input";
import  Select  from "@/components/ui/Select";
import  Button  from "@/components/ui/Button";

export default function CreateSchoolPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    schoolName: "",
    code: "",
    email: "",
    phone: "",
    website: "",
    board: "",
    establishedYear: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      // API integration will be added later.
      await new Promise((resolve) => setTimeout(resolve, 700));

      router.push("/master/schools");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add School"
        description="Create a new school in the system."
        action={
          <Link href="/master/schools">
            <Button variant="secondary">
              <ArrowLeft size={17} />
              Back
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Basic Information">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="School Name"
              required
              value={form.schoolName}
              onChange={(event) =>
                updateField("schoolName", event.target.value)
              }
              placeholder="Green Valley Public School"
            />

            <Input
              label="School Code"
              required
              value={form.code}
              onChange={(event) =>
                updateField("code", event.target.value)
              }
              placeholder="GVPS001"
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              placeholder="school@example.com"
            />

            <Input
              label="Phone"
              value={form.phone}
              onChange={(event) =>
                updateField("phone", event.target.value)
              }
              placeholder="+91 9876543210"
            />

            <Input
              label="Website"
              value={form.website}
              onChange={(event) =>
                updateField("website", event.target.value)
              }
              placeholder="https://example.com"
            />

            <Select
              label="Board"
              value={form.board}
              onChange={(event) =>
                updateField("board", event.target.value)
              }
              options={[
                { value: "", label: "Select board" },
                { value: "CBSE", label: "CBSE" },
                { value: "ICSE", label: "ICSE" },
                { value: "STATE", label: "State Board" },
                { value: "OTHER", label: "Other" },
              ]}
            />

            <Input
              label="Established Year"
              type="number"
              value={form.establishedYear}
              onChange={(event) =>
                updateField("establishedYear", event.target.value)
              }
              placeholder="2010"
            />
          </div>
        </Card>

        <Card title="Address">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                label="Address"
                value={form.address}
                onChange={(event) =>
                  updateField("address", event.target.value)
                }
                placeholder="School address"
              />
            </div>

            <Input
              label="City"
              value={form.city}
              onChange={(event) =>
                updateField("city", event.target.value)
              }
              placeholder="Patna"
            />

            <Input
              label="State"
              value={form.state}
              onChange={(event) =>
                updateField("state", event.target.value)
              }
              placeholder="Bihar"
            />

            <Input
              label="Pincode"
              value={form.pincode}
              onChange={(event) =>
                updateField("pincode", event.target.value)
              }
              placeholder="800001"
            />
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/master/schools">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Link>

          <Button type="submit" loading={loading}>
            <Save size={17} />
            Save School
          </Button>
        </div>
      </form>
    </div>
  );
}