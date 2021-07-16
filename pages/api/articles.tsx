import { connectToDatabase } from 'util/mongodb';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 4);

export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { title } = req.body;

    const result = await db.collection('articles').insertOne({
      nid: `${title.trim().replace(/[ ]/g, '-')}-${nanoid()}`,
      ...req.body,
    });
    console.log(result);
    // req.body.id = result.insertedId;

    res.status(201).json({ message: 'Success!', article: req.body });
  }

  // client.close();
}
