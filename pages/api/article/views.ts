import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId, Db } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      await db.collection('articles').updateOne(
        { nid: req.body.id },
        {
          $inc: { views: 1 },
        }
      );

      return res.status(201);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }
}
