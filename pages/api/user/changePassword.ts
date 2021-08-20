import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
const logger = require('logger-line-number');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
  }
}
