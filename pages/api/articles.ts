import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 4);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  const { headline } = req.body;

  try {
    const result = await db.collection('articles').insertOne({
      nid: `${headline.trim().replace(/[ ]/g, '-')}-${nanoid()}`,
      ...req.body,
    });

    res.status(201).json({ message: 'Success!', article: req.body });
  } catch (error) {
    console.log(error);
  }
}
