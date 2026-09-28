import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import {
  getAuthContext,
  requirePermission,
} from "@/lib/auth/authorization";

export async function DELETE(request, { params }) {
  try {
    const auth = await getAuthContext();

    /*
     * Rahul is TEACHER.
     *
     * Teacher does NOT have:
     * student.delete
     */
    requirePermission(
      auth,
      "student.delete"
    );

    const { id } = await params;

    const studentId = BigInt(id);

    const student =
      await prisma.student.findUnique({
        where: {
          id: studentId,
        },
      });

    if (!student) {
      return NextResponse.json(
        {
          message: "Student not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * SUPER_ADMIN bypasses scope restriction.
     */
    if (!auth.isSuperAdmin) {
      const hasAccess =
        auth.userRoles.some(
          (userRole) => {
            if (
              userRole.school_id === null
            ) {
              return false;
            }

            /*
             * School-wide role
             */
            if (
              userRole.branch_id === null
            ) {
              return (
                userRole.school_id.toString() ===
                student.school_id.toString()
              );
            }

            /*
             * Exact branch role
             */
            return (
              userRole.school_id.toString() ===
                student.school_id.toString() &&
              userRole.branch_id.toString() ===
                student.branch_id.toString()
            );
          }
        );

      if (!hasAccess) {
        return NextResponse.json(
          {
            message:
              "You do not have access to this student.",
          },
          {
            status: 403,
          }
        );
      }
    }

    await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    return NextResponse.json({
      message:
        "Student deleted successfully.",
    });
  } catch (error) {
    if (error.status === 401) {
      return NextResponse.json(
        {
          message:
            "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    if (error.status === 403) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 403,
        }
      );
    }

    console.error(
      "DELETE_STUDENT_ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}