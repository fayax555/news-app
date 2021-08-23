import { connectToDatabase } from 'util/mongodb';
import { Db, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const cid = new ObjectId(String(req.query.id));

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
