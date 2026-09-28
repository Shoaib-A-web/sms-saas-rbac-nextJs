import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import {
  getAuthContext,
  requirePermission,
  hasScopeAccess,
} from "@/lib/auth/authorization";

export async function GET() {
  try {
    const auth = await getAuthContext();

    /*
     * Authentication
     * + permission check
     */
    requirePermission(auth, "student.view");

    /*
     * SUPER_ADMIN can access everything.
     */
    if (auth.isSuperAdmin) {
      const students = await prisma.student.findMany({
        orderBy: {
          id: "desc",
        },
      });

      return NextResponse.json({
        students: students.map(serializeStudent),
      });
    }

    /*
     * Get only students whose exact
     * school + branch combination
     * belongs to the user's assignment.
     */
    const students = await prisma.student.findMany({
      where: {
        OR: auth.userRoles
          .filter(
            (userRole) =>
              userRole.school_id !== null
          )
          .map((userRole) => {
            /*
             * School-wide assignment
             *
             * branch_id = null
             */
            if (
              userRole.branch_id === null
            ) {
              return {
                school_id:
                  userRole.school_id,
              };
            }

            /*
             * Exact branch assignment
             */
            return {
              school_id:
                userRole.school_id,

              branch_id:
                userRole.branch_id,
            };
          }),
      },

      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({
      students: students.map(serializeStudent),
    });
  } catch (error) {
    if (error.status === 401) {
      return NextResponse.json(
        {
          message: "Authentication required.",
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
      "GET_STUDENTS_ERROR:",
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

function serializeStudent(student) {
  return {
    id: student.id.toString(),

    school_id:
      student.school_id.toString(),

    branch_id:
      student.branch_id.toString(),

    user_id:
      student.user_id?.toString() ?? null,

    student_no: student.student_no,
    first_name: student.first_name,
    last_name: student.last_name,
    date_of_birth: student.date_of_birth,
    gender: student.gender,
    phone: student.phone,
    address: student.address,
    admission_date: student.admission_date,
    created_at: student.created_at,
    updated_at: student.updated_at,
  };
}