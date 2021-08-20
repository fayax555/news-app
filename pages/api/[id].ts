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
    const { db }: { db: Db } = await connectToDatabase();

    try {
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
