import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId, Db } from 'mongodb';
import { getSession } from 'next-auth/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized access not allowed' });
  }

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
