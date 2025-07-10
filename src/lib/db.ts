// hack for hot reloading not to create multiple instances of prisma client

import { PrismaClient } from "@/generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}


// // lib/db.ts
// import { PrismaClient } from "@/generated/prisma"

// const globalForPrisma = globalThis as unknown as {
//   prisma?: PrismaClient
// }

// // 💡 Tạo client một lần duy nhất
// const prismaClient =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
//   })

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prismaClient
// }

// export const db = prismaClient
