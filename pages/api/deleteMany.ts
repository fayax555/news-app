import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { db } = await connectToDatabase();

      const objects = req.body.map((id: string) => new ObjectId(id));

      const result = await db.collection('articles').deleteMany({
        _id: {
          $in: objects,
        },
      });

      res.status(201).json({
        message: `${result.deletedCount} deleted`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error!' });
    }
  }
}
