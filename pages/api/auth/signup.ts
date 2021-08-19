import { connectToDatabase } from 'util/mongodb';
import { Db } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from 'util/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db }: { db: Db } = await connectToDatabase();

  const { name, email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 3
  ) {
    return res.status(422).json({ message: 'Invalid Input' });
  }

  const user = await db.collection('users').findOne({ email });

  if (user) return res.status(422).json({ message: 'Email already exists' });

  const hashedPassword = await hashPassword(password);

  try {
    await db
      .collection('users')
      .insertOne({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Sign Up Successful' });
  } catch (error) {
    console.error(error);
  }
}
