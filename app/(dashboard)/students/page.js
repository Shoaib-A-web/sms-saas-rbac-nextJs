"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const students = [
  {
    id: 1,
    std_id: "STD-1001",
    name: "Aarav Sharma",
    className: "Class 10",
    section: "A",
    gender: "Male",
    status: "ACTIVE",
  },

  {
    id: 2,
    std_id: "STD-1002",
    name: "Ananya Singh",
    className: "Class 8",
    section: "B",
    gender: "Female",
    status: "ACTIVE",
  },

  {
    id: 3,
    std_id: "STD-1003",
    name: "Rahul Kumar",
    className: "Class 9",
    section: "A",
    gender: "Male",
    status: "INACTIVE",
  },

  {
    id: 4,
    std_id: "STD-1004",
    name: "Priya Verma",
    className: "Class 7",
    section: "C",
    gender: "Female",
    status: "ACTIVE",
  },

  {
    id: 5,
    std_id: "STD-1005",
    name: "Aditya Singh",
    className: "Class 6",
    section: "A",
    gender: "Male",
    status: "ACTIVE",
  },
];

export default function StudentsPage() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [deleteStudent, setDeleteStudent] =
    useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.std_id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "ALL" ||
        student.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [search, status]);

  const columns = [
    {
      key: "std_id",
      label: "Student ID",
    },

    {
      key: "name",
      label: "Student",
      render: (student) => (
        <div className="flex items-center gap-3">
          <div className=" flex size-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-semibold text-[var(--color-primary)] ">
            {student.name
              .split(" ")
              .map(
                (part) => part[0]
              )
              .join("")}
          </div>

          <span className="font-medium">
            {student.name}
          </span>
        </div>
      ),
    },

    {
      key: "className",
      label: "Class",
    },

    {
      key: "section",
      label: "Section",
    },

    {
      key: "gender",
      label: "Gender",
    },

    {
      key: "status",
      label: "Status",
      render: (student) => (
        <Badge
          variant={
            student.status ===
            "ACTIVE"
              ? "success"
              : "default"
          }
        >
          {student.status}
        </Badge>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      render: (student) => (
        <div className="flex items-center gap-1">
          <Link
            href={`/students/${student.id}`}
          >
            <Button
              variant="ghost"
              size="sm"
              aria-label={`View ${student.name}`}
            >
              <Eye size={16} />
            </Button>
          </Link>

          <Link
            href={`/students/${student.id}/edit`}
          >
            <Button
              variant="ghost"
              size="sm"
              aria-label={`Edit ${student.name}`}
            >
              <Pencil size={16} />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setDeleteStudent(student)
            }
            aria-label={`Delete ${student.name}`}
          >
            <Trash2
              size={16}
              className="text-[var(--color-danger)]"
            />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Students"
        description="Manage student records and information."
        actions={
          <Link href="/students/create">
            <Button>
              <Plus size={16} />
              Add Student
            </Button>
          </Link>
        }
      />

      <Card>
        {/* Filters */}
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_200px]">
          <Input
            placeholder="Search by student name or ID..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          <Select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
          >
            <option value="ALL">
              All Status
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </Select>
        </div>

        <DataTable
          columns={columns}
          data={filteredStudents}
          emptyMessage="No students match your search."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteStudent)}
        onClose={() =>
          setDeleteStudent(null)
        }
        onConfirm={() => {
          setDeleteStudent(null);
        }}
        title="Delete student?"
        description={`You are about to delete ${deleteStudent?.name || "this student"}.`}
        confirmText="Delete"
        danger
      />
    </div>
  );
}