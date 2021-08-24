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
  
  if (req.method === 'POST') {
    const { _id, name, comment } = req.body;

    try {
      const { db }: { db: Db } = await connectToDatabase();

      await db.collection('articles').updateOne(
        { _id: new ObjectId(_id) },
        {
          $push: {
            comments: {
              cid: new ObjectId(),
              name,
              comment,
              status: 'pending',
              createdAt: Date(),
            },
          },
        }
      );

      res.status(201).json({ message: 'Comment sent!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An Error occurred!' });
    }
  }
}
