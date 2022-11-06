import { PrismaClient } from "@prisma/client";

export const connectToDb = async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();
    return prisma;
}