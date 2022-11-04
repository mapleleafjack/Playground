import axios from 'axios';
import { DataThingy } from '../types';

export const getDataThingyById = async (
    thingy_id: string
): Promise<DataThingy[] | []> => {
    console.log(thingy_id)

    let thingy: DataThingy = {
        key_1: "jack",
        key_2: 'musajo'
    }

    return [thingy];
};