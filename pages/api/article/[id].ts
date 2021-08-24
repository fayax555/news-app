import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId, Db } from 'mongodb';
import { getSession } from 'next-auth/client';
import { Comment } from 'components/NewsPage/ArticleTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const _id = new ObjectId(String(req.query.id));

  if (req.method === 'GET') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const article = await db.collection('articles').findOne({
        _id,
      });

      if (!article || !article.comments) return;

      const comments = article.comments.map(
        ({ name, comment, createdAt, cid }: Comment) => ({
          cid,
          name,
          comment,
          createdAt,
        })
      );

      return res.status(200).json({ comments });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      await db.collection('articles').updateOne(
        { _id },
        {
          $inc: { views: 1 },
        }
      );

      return res.status(201);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error!' });
    }
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized access not allowed' });
  }

  if (req.method === 'DELETE') {
    try {
      const { db }: { db: Db } = await connectToDatabase();

      const result = await db.collection('articles').findOneAndDelete({ _id });

      const deletedArticle = result.value?.headline;

      res.status(201).json({
        message: `'${deletedArticle}' deleted`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error!' });
    }
  }
}
