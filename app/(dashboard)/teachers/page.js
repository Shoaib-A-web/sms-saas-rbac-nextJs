"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Plus,
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

const teachers = [
  {
    id: 1,
    emp_id: "EMP-1001",
    name: "Rahul Verma",
    designation: "Mathematics Teacher",
    phone: "+91 9876543210",
    status: "ACTIVE",
  },

  {
    id: 2,
    emp_id: "EMP-1002",
    name: "Priya Sharma",
    designation: "English Teacher",
    phone: "+91 9876543211",
    status: "ACTIVE",
  },

  {
    id: 3,
    emp_id: "EMP-1003",
    name: "Amit Kumar",
    designation: "Science Teacher",
    phone: "+91 9876543212",
    status: "INACTIVE",
  },

  {
    id: 4,
    emp_id: "EMP-1004",
    name: "Neha Singh",
    designation: "Computer Teacher",
    phone: "+91 9876543213",
    status: "ACTIVE",
  },
];

export default function TeachersPage() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [deleteTeacher, setDeleteTeacher] =
    useState(null);

  const filteredTeachers =
    useMemo(() => {
      return teachers.filter(
        (teacher) => {
          const searchText =
            search.toLowerCase();

          const matchesSearch =
            teacher.name
              .toLowerCase()
              .includes(searchText) ||
            teacher.emp_id
              .toLowerCase()
              .includes(searchText) ||
            teacher.designation
              .toLowerCase()
              .includes(searchText);

          const matchesStatus =
            status === "ALL" ||
            teacher.status === status;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [search, status]);

  const columns = [
    {
      key: "emp_id",
      label: "Employee ID",
    },

    {
      key: "name",
      label: "Teacher",
      render: (teacher) => (
        <div className="flex items-center gap-3">
          <div className=" flex size-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-semibold text-[var(--color-primary)] ">
            {teacher.name
              .split(" ")
              .map(
                (part) => part[0]
              )
              .join("")}
          </div>

          <span className="font-medium">
            {teacher.name}
          </span>
        </div>
      ),
    },

    {
      key: "designation",
      label: "Designation",
    },

    {
      key: "phone",
      label: "Phone",
    },

    {
      key: "status",
      label: "Status",
      render: (teacher) => (
        <Badge
          variant={
            teacher.status ===
            "ACTIVE"
              ? "success"
              : "default"
          }
        >
          {teacher.status}
        </Badge>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      render: (teacher) => (
        <div className="flex items-center gap-1">
          <Link
            href={`/teachers/${teacher.id}`}
          >
            <Button
              variant="ghost"
              size="sm"
            >
              <Eye size={16} />
            </Button>
          </Link>

          <Link
            href={`/teachers/${teacher.id}/edit`}
          >
            <Button
              variant="ghost"
              size="sm"
            >
              <Pencil size={16} />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setDeleteTeacher(
                teacher
              )
            }
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
        title="Teachers"
        description="Manage teachers and staff members."
        actions={
          <Link href="/teachers/create">
            <Button>
              <Plus size={16} />
              Add Teacher
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_200px]">
          <Input
            placeholder="Search by name, ID or designation..."
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
          data={filteredTeachers}
          emptyMessage="No teachers match your search."
        />
      </Card>

      <ConfirmDialog
        open={Boolean(deleteTeacher)}
        onClose={() =>
          setDeleteTeacher(null)
        }
        onConfirm={() =>
          setDeleteTeacher(null)
        }
        title="Delete teacher?"
        description={`You are about to delete ${deleteTeacher?.name || "this teacher"}.`}
        confirmText="Delete"
        danger
      />
    </div>
  );
}