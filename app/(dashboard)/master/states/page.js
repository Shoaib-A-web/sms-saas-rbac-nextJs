"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Button  from "@/components/ui/Button";
import  Input  from "@/components/ui/Input";
import  DataTable  from "@/components/ui/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const initialStates = [
  { id: 1, name: "Bihar", code: "BR" },
  { id: 2, name: "West Bengal", code: "WB" },
  { id: 3, name: "Delhi", code: "DL" },
  { id: 4, name: "Maharashtra", code: "MH" },
];

export default function StatesPage() {
  const [items, setItems] = useState(initialStates);

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

  const addState = (event) => {
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

  const deleteState = () => {
    setItems((current) =>
      current.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
  };

  const columns = [
    {
      key: "name",
      label: "State",
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
        title="States"
        description="Manage states used in school and student addresses."
      />

      <Card>
        <form
          onSubmit={addState}
          className="grid gap-3 sm:grid-cols-[1fr_180px_auto]"
        >
          <Input
            placeholder="State name"
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
          />

          <Input
            placeholder="State code"
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
          emptyMessage="No states found."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteState}
        title="Delete state?"
        description="The selected state will be removed."
        confirmText="Delete"
        danger
      />
    </div>
  );
}