import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataThingyById } from '../../../lib/getData'
import { DataThingy } from '../../../types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataThingy[]>
) {
    switch (req.method) {
        case 'GET':
            try {
                let data = await getDataThingyById(req.query.id as string);
                res.status(200).json(data);
            } catch (error) {
                console.error(
                    'GetThingy error:',
                    error
                );
            }
            break;
        default:
            res.status(404);
    }
}