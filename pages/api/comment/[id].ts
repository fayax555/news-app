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

      console.log(article);
    } catch (error) {}
  }
}
