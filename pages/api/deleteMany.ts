import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { db } = await connectToDatabase();

      const objects = [
        new ObjectId('6116c2e46f9b6c57ac616994'),
        new ObjectId('6116bfbb6f9b6c57ac616993'),
        new ObjectId('6116a056f9a66f7a480e20ef'),
      ];

      const result = await db.collection('articles').deleteMany({
        _id: {
          $in: objects,
        },
      });

      // const deletedArticle = result.value.headline;
      console.log(result);

      res.status(201).json({
        message: ` deleted`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error!' });
    }
  }
}
