// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { Pencil, Plus, Trash2 } from "lucide-react";


// import  PageHeader  from "@/components/shared/PageHeader";
// import  Card  from "@/components/ui/Card";
// import  Button  from "@/components/ui/Button";
// import  Input  from "@/components/ui/Input";
// import  Badge  from "@/components/ui/Badge";
// import  DataTable  from "@/components/ui/DataTable";
// import ConfirmDialog from "@/components/shared/ConfirmDialog";

// const initialClasses = [
//   { id: 1, name: "Class 1", code: "CLS01", status: "ACTIVE" },
//   { id: 2, name: "Class 2", code: "CLS02", status: "ACTIVE" },
//   { id: 3, name: "Class 3", code: "CLS03", status: "ACTIVE" },
//   { id: 4, name: "Class 10", code: "CLS10", status: "INACTIVE" },
// ];

// export default function ClassesPage() {
//   const [classes, setClasses] = useState(initialClasses);
//   const [search, setSearch] = useState("");
//   const [deleteId, setDeleteId] = useState(null);

//   const filteredClasses = useMemo(() => {
//     const query = search.toLowerCase().trim();

//     return classes.filter(
//       (item) =>
//         !query ||
//         item.name.toLowerCase().includes(query) ||
//         item.code.toLowerCase().includes(query)
//     );
//   }, [classes, search]);

//   const deleteClass = () => {
//     setClasses((current) =>
//       current.filter((item) => item.id !== deleteId)
//     );

//     setDeleteId(null);
//   };

//   const columns = [
//     {
//       key: "name",
//       label: "Class",
//     },
//     {
//       key: "code",
//       label: "Code",
//     },
//     {
//       key: "status",
//       label: "Status",
//       render: (item) => (
//         <Badge variant={item.status === "ACTIVE" ? "success" : "secondary"}>
//           {item.status}
//         </Badge>
//       ),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       render: (item) => (
//         <div className="flex gap-1">
//           <Link href={`/master/classes/${item.id}/edit`}>
//             <Button variant="ghost" size="sm" aria-label={`Edit ${item.name}`}>
//               <Pencil size={16} />
//             </Button>
//           </Link>

//           <Button
//             variant="ghost"
//             size="sm"
//             aria-label={`Delete ${item.name}`}
//             onClick={() => setDeleteId(item.id)}
//           >
//             <Trash2 size={16} />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Classes"
//         description="Manage academic classes."
//         action={
//           <Link href="/master/classes/create">
//             <Button>
//               <Plus size={17} />
//               Add Class
//             </Button>
//           </Link>
//         }
//       />

//       <Card>
//         <Input
//           placeholder="Search classes..."
//           value={search}
//           onChange={(event) => setSearch(event.target.value)}
//         />
//       </Card>

//       <Card>
//         <DataTable
//           columns={columns}
//           data={filteredClasses}
//           emptyMessage="No classes found."
//         />
//       </Card>

//       <ConfirmDialog
//         open={Boolean(deleteId)}
//         onClose={() => setDeleteId(null)}
//         onConfirm={deleteClass}
//         title="Delete class?"
//         description="The selected class will be removed from this list."
//         confirmText="Delete"
//         danger
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import  PageHeader  from "@/components/shared/PageHeader";
import  Card  from "@/components/ui/Card";
import  Input  from "@/components/ui/Input";
import  Button  from "@/components/ui/Button";

export default function CreateClassPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
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

      router.push("/master/classes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Class"
        description="Create a new academic class."
        action={
          <Link href="/master/classes">
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
            <Input
              label="Class Name"
              required
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
              placeholder="Class 1"
            />

            <Input
              label="Class Code"
              required
              value={form.code}
              onChange={(event) =>
                updateField("code", event.target.value)
              }
              placeholder="CLS01"
            />

            <div className="md:col-span-2">
              <Input
                label="Description"
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Optional description"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Link href="/master/classes">
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </Link>

            <Button type="submit" loading={loading}>
              <Save size={17} />
              Save Class
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}