
// //Regestration logic 

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { hashPassword } from "@/lib/auth/password";


// export async function POST(request) {
//   try {
//     const body = await request.json();

//     const {
//       name,
//       email,
//       password,
//       phone,
//     } = body;

//     if (!name || !email || !password) {
//       return NextResponse.json(
//         {
//           message: "Name, email and password are required",
//         },
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         {
//           message: "User already exists",
//         },
//         { status: 409 }
//       );
//     }

//     const password_hash = await hashPassword(password);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password_hash,
//         phone,
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "User created successfully",
//         user: {
//           id: user.id.toString(),
//           name: user.name,
//           email: user.email,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const role = body.role?.trim();
    const school = body.school?.trim();
    const branch = body.branch?.trim();
    const password = body.password;
    if (!name || !email || !password || !school || !branch || !role) {
      return NextResponse.json(
        {
          message: "Name, email, role, school, branch and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Unable to create account with these details.",
        },
        {
          status: 409,
        }
      );
    }
  
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password_hash: passwordHash,
      },
    });

    await prisma.userRole.create({
      data: {
        user_id: BigInt(user.id),
        school_id: BigInt(school),
        branch_id: BigInt(branch),
        role_id: BigInt(role)
      }
    })

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);

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