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

  const hashedPassword = await hashPassword(password);

  const result = db
    .collection('users')
    .insertOne({ name, email, password: hashedPassword });

  res.status(201).json({ message: 'Sign Up Successful' });
}
