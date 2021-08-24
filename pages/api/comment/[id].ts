import { connectToDatabase } from 'util/mongodb';
import { Db, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized access not allowed' });
  }

  const cid = new ObjectId(String(req.query.id));

  if (req.method === 'PATCH') {
    try {
      const { db }: { db: Db } = await connectToDatabase();
      const { status } = req.body;

      const result = await db.collection('articles').updateOne(
        {
          comments: { $elemMatch: { cid } },
        },
        { $set: { comments: { status } } }
      );

      console.log(result);
      res.status(200).json({ message: 'Success!' });
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const result = await db.collection('articles').updateOne(
        {
          comments: { $elemMatch: { cid } },
        },
        { $pull: { comments: { cid } } }
      );

      console.log(result);
      res.status(200).json({ message: 'Success!' });
    } catch (error) {}
  }
}
