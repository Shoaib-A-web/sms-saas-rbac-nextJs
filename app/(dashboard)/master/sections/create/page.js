"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Input  from "@/components/ui/Input";
import  Select  from "@/components/ui/Select";
import  Button  from "@/components/ui/Button";

export default function CreateSectionPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    className: "",
    capacity: "",
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
      await new Promise((resolve) => setTimeout(resolve, 700));

      router.push("/master/sections");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Section"
        description="Create a section for an academic class."
        action={
          <Link href="/master/sections">
            <Button variant="secondary">
              <ArrowLeft size={17} />
              Back
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit}>
        <Card>
          <div className="grid gap-5 md:grid-cols-2">
            <Select
              label="Class"
              required
              value={form.className}
              onChange={(event) =>
                updateField("className", event.target.value)
              }
              options={[
                { value: "", label: "Select class" },
                { value: "Class 1", label: "Class 1" },
                { value: "Class 2", label: "Class 2" },
                { value: "Class 3", label: "Class 3" },
              ]}
            />

            <Input
              label="Section Name"
              required
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
              placeholder="A"
            />

            <Input
              label="Capacity"
              type="number"
              value={form.capacity}
              onChange={(event) =>
                updateField("capacity", event.target.value)
              }
              placeholder="40"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Link href="/master/sections">
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </Link>

            <Button type="submit" loading={loading}>
              <Save size={17} />
              Save Section
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}