import { connectToDatabase } from 'util/mongodb';
import { Db } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from 'util/auth';
import { getSession } from 'next-auth/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  // user can't create an account if they are logged in
  if (session) {
    return res
      .status(403)
      .json({ message: 'Please logout before creating an account!' });
  }

  const { db }: { db: Db } = await connectToDatabase();

  const { name, email, password, confirmPassword } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 3
  ) {
    return res.status(422).json({ message: 'Invalid Input' });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ message: `Passwords don't match` });
  }

  const user = await db.collection('users').findOne({ email });

  if (user) return res.status(422).json({ message: 'Email already exists' });

  const hashedPassword = await hashPassword(password);

  try {
    await db
      .collection('users')
      .insertOne({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'Sign Up Successful' });
  } catch (error) {
    console.error(error);
  }
}
