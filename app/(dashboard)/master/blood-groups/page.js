"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";


import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Button  from "@/components/ui/Button";
import  Input  from "@/components/ui/Input";
import  DataTable  from "@/components/ui/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const initialBloodGroups = [
  { id: 1, name: "A+" },
  { id: 2, name: "A-" },
  { id: 3, name: "B+" },
  { id: 4, name: "B-" },
  { id: 5, name: "AB+" },
  { id: 6, name: "AB-" },
  { id: 7, name: "O+" },
  { id: 8, name: "O-" },
];

export default function BloodGroupsPage() {
  const [items, setItems] = useState(initialBloodGroups);
  const [name, setName] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const addBloodGroup = (event) => {
    event.preventDefault();

    const value = name.trim();

    if (!value) return;

    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        name: value,
      },
    ]);

    setName("");
  };

  const deleteItem = () => {
    setItems((current) =>
      current.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
  };

  const columns = [
    {
      key: "name",
      label: "Blood Group",
      render: (item) => (
        <span className="font-medium">{item.name}</span>
      ),
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
        title="Blood Groups"
        description="Manage blood group master values."
      />

      <Card>
        <form
          onSubmit={addBloodGroup}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Input
            placeholder="Enter blood group"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
          emptyMessage="No blood groups found."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteItem}
        title="Delete blood group?"
        description="The selected blood group will be removed."
        confirmText="Delete"
        danger
      />
    </div>
  );
}