"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Button  from "@/components/ui/Button";
import  Input  from "@/components/ui/Input";
import  Badge  from "@/components/ui/Badge";
import  Select  from "@/components/ui/Select";
import  DataTable  from "@/components/ui/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const initialSections = [
  {
    id: 1,
    name: "A",
    className: "Class 1",
    capacity: 40,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "B",
    className: "Class 1",
    capacity: 40,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "A",
    className: "Class 2",
    capacity: 40,
    status: "ACTIVE",
  },
];

export default function SectionsPage() {
  const [sections, setSections] = useState(initialSections);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [deleteId, setDeleteId] = useState(null);

  const filteredSections = useMemo(() => {
    const query = search.toLowerCase().trim();

    return sections.filter((section) => {
      const matchesSearch =
        !query ||
        section.name.toLowerCase().includes(query) ||
        section.className.toLowerCase().includes(query);

      const matchesClass =
        classFilter === "ALL" ||
        section.className === classFilter;

      return matchesSearch && matchesClass;
    });
  }, [sections, search, classFilter]);

  const deleteSection = () => {
    setSections((current) =>
      current.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
  };

  const columns = [
    {
      key: "name",
      label: "Section",
    },
    {
      key: "className",
      label: "Class",
    },
    {
      key: "capacity",
      label: "Capacity",
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <Badge variant="success">{item.status}</Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className="flex gap-1">
          <Link href={`/master/sections/${item.id}/edit`}>
            <Button variant="ghost" size="sm" aria-label={`Edit section ${item.name}`}>
              <Pencil size={16} />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete section ${item.name}`}
            onClick={() => setDeleteId(item.id)}
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
        title="Sections"
        description="Manage sections for each academic class."
        action={
          <Link href="/master/sections/create">
            <Button>
              <Plus size={17} />
              Add Section
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search sections..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Select
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
            options={[
              { value: "ALL", label: "All Classes" },
              { value: "Class 1", label: "Class 1" },
              { value: "Class 2", label: "Class 2" },
              { value: "Class 3", label: "Class 3" },
            ]}
          />
        </div>
      </Card>

      <Card>
        <DataTable
          columns={columns}
          data={filteredSections}
          emptyMessage="No sections found."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteSection}
        title="Delete section?"
        description="The selected section will be removed from this list."
        confirmText="Delete"
        danger
      />
    </div>
  );
}