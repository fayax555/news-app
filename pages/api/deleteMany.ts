import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId, Db } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const objectIds = req.body.map((id: string) => new ObjectId(id));

      const result = await db.collection('articles').deleteMany({
        _id: {
          $in: objectIds,
        },
      });

      const del = result.deletedCount;

      res.status(201).json({
        message: `${del} article${del !== 1 ? 's' : ''} deleted`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error!' });
    }
  }
}
