"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Button  from "@/components/ui/Button";
import  Input  from "@/components/ui/Input";
import  DataTable  from "@/components/ui/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const initialCategories = [
  { id: 1, name: "General", code: "GEN" },
  { id: 2, name: "OBC", code: "OBC" },
  { id: 3, name: "SC", code: "SC" },
  { id: 4, name: "ST", code: "ST" },
  { id: 5, name: "EWS", code: "EWS" },
];

export default function CategoriesPage() {
  const [items, setItems] = useState(initialCategories);
  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const [deleteId, setDeleteId] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addCategory = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.code.trim()) return;

    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
      },
    ]);

    setForm({
      name: "",
      code: "",
    });
  };

  const deleteCategory = () => {
    setItems((current) =>
      current.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
  };

  const columns = [
    {
      key: "name",
      label: "Category",
    },
    {
      key: "code",
      label: "Code",
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Edit ${item.name}`}
          >
            <Pencil size={16} />
          </Button>

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
        title="Categories"
        description="Manage student categories."
      />

      <Card>
        <form
          onSubmit={addCategory}
          className="grid gap-3 sm:grid-cols-[1fr_180px_auto]"
        >
          <Input
            placeholder="Category name"
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
          />

          <Input
            placeholder="Code"
            value={form.code}
            onChange={(event) =>
              updateField("code", event.target.value)
            }
          />

          <Button type="submit">
            <Plus size={17} />
            Add
          </Button>
        </form>
      </Card>

      <Card>
        <DataTable
          columns={columns}
          data={items}
          emptyMessage="No categories found."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteCategory}
        title="Delete category?"
        description="The selected category will be removed."
        confirmText="Delete"
        danger
      />
    </div>
  );
}