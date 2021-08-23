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

      const article = await db.collection('articles').findOne({
        comments: { $elemMatch: { cid: new ObjectId(String(req.query.id)) } },
      });

      if (!article) return;

      const result = await db.collection('articles').updateOne(
        { _id: new ObjectId(String(article._id)) },
        {
          $pull: { comments: { cid: new ObjectId(String(req.query.id)) } },
        }
      );

      res.status(200).json({ message: 'Success!' });
      console.log(result);
    } catch (error) {}
  }
}
