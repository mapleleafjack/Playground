import { Thingy } from '@prisma/client';
import { getThingies } from 'lib/thingy';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Thingy[]>
) {
    switch (req.method) {
        case 'GET':
            try {
                // let data = await getDataThingyById(req.query.id as string);
                let data = await getThingies()
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