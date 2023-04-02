import { Thingy } from '@prisma/client';
import { deleteThingy, getThingies } from 'lib/database/entities/thingy';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Thingy[]>
) {
    switch (req.method) {
        case 'GET':
            try {
                let data = await getThingies()
                res.status(200).json(data);
            } catch (error) {
                console.error(
                    'GetThingy error:',
                    error
                );
            }
            break;
        case 'DELETE':
            try {
                let data = await deleteThingy(req.query.id as string)
                res.status(200).json([data]);
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