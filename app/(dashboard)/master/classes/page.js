"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Button  from "@/components/ui/Button";
import  Input  from "@/components/ui/Input";
import  Badge  from "@/components/ui/Badge";
import  DataTable  from "@/components/ui/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const initialClasses = [
  { id: 1, name: "Class 1", code: "CLS01", status: "ACTIVE" },
  { id: 2, name: "Class 2", code: "CLS02", status: "ACTIVE" },
  { id: 3, name: "Class 3", code: "CLS03", status: "ACTIVE" },
  { id: 4, name: "Class 10", code: "CLS10", status: "INACTIVE" },
];

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filteredClasses = useMemo(() => {
    const query = search.toLowerCase().trim();

    return classes.filter(
      (item) =>
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query)
    );
  }, [classes, search]);

  const deleteClass = () => {
    setClasses((current) =>
      current.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
  };

  const columns = [
    {
      key: "name",
      label: "Class",
    },
    {
      key: "code",
      label: "Code",
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <Badge variant={item.status === "ACTIVE" ? "success" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className="flex gap-1">
          <Link href={`/master/classes/${item.id}/edit`}>
            <Button variant="ghost" size="sm" aria-label={`Edit ${item.name}`}>
              <Pencil size={16} />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${item.name}`}
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
        title="Classes"
        description="Manage academic classes."
        action={
          <Link href="/master/classes/create">
            <Button>
              <Plus size={17} />
              Add Class
            </Button>
          </Link>
        }
      />

      <Card>
        <Input
          placeholder="Search classes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Card>

      <Card>
        <DataTable
          columns={columns}
          data={filteredClasses}
          emptyMessage="No classes found."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteClass}
        title="Delete class?"
        description="The selected class will be removed from this list."
        confirmText="Delete"
        danger
      />
    </div>
  );
}