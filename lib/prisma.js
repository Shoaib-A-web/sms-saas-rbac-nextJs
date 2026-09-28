import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";

const globalForPrisma = globalThis;

// const adapter = new PrismaMariaDb({
//   host: process.env.DATABASE_HOST,
//   port: Number(process.env.DATABASE_PORT),
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   connectionLimit: 5,
// });


const adapter = new PrismaPostgresAdapter({
  connectionString: process.env.DATABASE_URL 
})

export const prisma =globalForPrisma.prisma || new PrismaClient({ adapter, });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}