import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { db } = await connectToDatabase();

    try {
      const result = await db
        .collection('articles')
        .deleteOne({ _id: new ObjectId(req.body.id) });

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
