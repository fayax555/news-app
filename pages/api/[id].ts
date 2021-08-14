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
        .findOneAndDelete({ _id: new ObjectId(String(req.query.id)) });

      const deletedArticle = result.value.headline;
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
