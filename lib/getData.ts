import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { DataThingy } from 'types';

export const getDataThingyById = async (
    thingy_id: string
): Promise<DataThingy[] | []> => {

    let thingy: DataThingy = {
        id: "jack",
        name: 'musajo'
    }

    return [thingy];
};

export const getThingies = async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    const posts = await prisma.thingy.findMany()

    return posts;
}