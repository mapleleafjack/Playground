import { Thingy } from '@prisma/client';
import { postThingy } from 'lib/database/entities/thingy';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Thingy>
) {
    switch (req.method) {
        case 'POST':
            try {
                let data = await postThingy(req.query.name as string)
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