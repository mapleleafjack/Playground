import { DataThingy } from 'types';
import { connectToDb } from './db';


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
    const db = await connectToDb()
    const posts = await db.thingy.findMany()

    return posts;
}

export const deleteThingies = async () => {

}
