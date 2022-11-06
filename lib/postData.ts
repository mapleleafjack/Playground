import { PrismaClient } from "@prisma/client";

export const postThingy = async (name: string) => {
    const prisma = new PrismaClient()
    await prisma.$connect()

    return await prisma.thingy.create({
        data: {
            name: name
        }
    });
}