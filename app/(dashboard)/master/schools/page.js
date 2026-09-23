"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Button  from "@/components/ui/Button";
import  Input  from "@/components/ui/Input";
import  Select  from "@/components/ui/Select";
import  Badge  from "@/components/ui/Badge";
import  DataTable  from "@/components/ui/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const initialSchools = [
  {
    id: 1,
    name: "Green Valley Public School",
    code: "GVPS001",
    board: "CBSE",
    city: "Patna",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Bright Future Academy",
    code: "BFA002",
    board: "ICSE",
    city: "Delhi",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Sunrise International School",
    code: "SIS003",
    board: "CBSE",
    city: "Kolkata",
    status: "INACTIVE",
  },
];

export default function SchoolsPage() {
  const [schools, setSchools] = useState(initialSchools);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [deleteId, setDeleteId] = useState(null);

  const filteredSchools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schools.filter((school) => {
      const matchesSearch =
        !query ||
        school.name.toLowerCase().includes(query) ||
        school.code.toLowerCase().includes(query) ||
        school.city.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || school.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [schools, search, status]);

  const deleteSchool = () => {
    setSchools((current) =>
      current.filter((school) => school.id !== deleteId)
    );

    setDeleteId(null);
  };

  const columns = [
    {
      key: "name",
      label: "School",
      render: (school) => (
        <div>
          <p className="font-medium text-[var(--color-text)]">
            {school.name}
          </p>

          <p className="text-xs text-[var(--color-text-muted)]">
            {school.code}
          </p>
        </div>
      ),
    },
    {
      key: "board",
      label: "Board",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "status",
      label: "Status",
      render: (school) => (
        <Badge
          variant={school.status === "ACTIVE" ? "success" : "secondary"}
        >
          {school.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (school) => (
        <div className="flex items-center gap-1">
          <Link href={`/master/schools/${school.id}`}>
            <Button
              variant="ghost"
              size="sm"
              aria-label={`View ${school.name}`}
            >
              <Eye size={16} />
            </Button>
          </Link>

          <Link href={`/master/schools/${school.id}/edit`}>
            <Button
              variant="ghost"
              size="sm"
              aria-label={`Edit ${school.name}`}
            >
              <Pencil size={16} />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${school.name}`}
            onClick={() => setDeleteId(school.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schools"
        description="Manage schools and their basic information."
        action={
          <Link href="/master/schools/create">
            <Button>
              <Plus size={17} />
              Add School
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <Input
            placeholder="Search schools..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            options={[
              { value: "ALL", label: "All Status" },
              { value: "ACTIVE", label: "Active" },
              { value: "INACTIVE", label: "Inactive" },
            ]}
          />
        </div>
      </Card>

      <Card>
        <DataTable
          columns={columns}
          data={filteredSchools}
          emptyMessage="No schools found."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteSchool}
        title="Delete school?"
        description="This action cannot be undone. The selected school will be removed from this list."
        confirmText="Delete"
        danger
      />
    </div>
  );
}