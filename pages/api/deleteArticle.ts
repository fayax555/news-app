import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  try {
    await db.collection('articles').deleteOne({ nid: '3896883' });
  } catch (error) {
    console.log(error);
  }
}
