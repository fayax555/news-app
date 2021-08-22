import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId, Db } from 'mongodb';
import { getSession } from 'next-auth/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const article = await db.collection('articles').findOne({
        _id: new ObjectId(String(req.query.id)),
      });

      res.status(200).json({ data: article?.comments.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized access not allowed' });
  }

  if (req.method === 'PUT') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      db.collection('articles').updateOne(
        { _id: new ObjectId(String(req.query.id)) },
        {
          $inc: { views: 1 },
        }
      );

      res.status(201);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error!' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const result = await db
        .collection('articles')
        .findOneAndDelete({ _id: new ObjectId(String(req.query.id)) });

      const deletedArticle = result.value?.headline;
      console.log(result);

      res.status(201).json({
        message: `'${deletedArticle}' deleted`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error!' });
    }
  }
}
