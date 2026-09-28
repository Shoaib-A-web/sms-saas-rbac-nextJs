// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { requireSchoolAccess } from "@/lib/auth/school-access";

// export async function GET(request, { params }) {
//   try {
//     const { id } = await params;

//     if (!/^\d+$/.test(id)) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "INVALID_ID",
//             message: "Invalid school ID.",
//           },
//         },
//         { status: 400 }
//       );
//     }

//     const schoolId = BigInt(id);

//     const access = await requireSchoolAccess(schoolId);

//     if (access.error) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: access.error,
//             message:
//               access.status === 401
//                 ? "Please log in."
//                 : "You do not have access to this school.",
//           },
//         },
//         { status: access.status }
//       );
//     }

//     const school = await prisma.school.findUnique({
//       where: {
//         id: schoolId,
//       },
//       select: {
//         id: true,
//         name: true,
//         code: true,
//         status: true,
//         created_at: true,
//         updated_at: true,
//       },
//     });

//     if (!school) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "NOT_FOUND",
//             message: "School not found.",
//           },
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         ...school,
//         id: String(school.id),
//       },
//     });
//   } catch (error) {
//     console.error("GET /api/schools/[id]:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: {
//           code: "INTERNAL_ERROR",
//           message: "Unable to retrieve school.",
//         },
//       },
//       { status: 500 }
//     );
//   }
// }