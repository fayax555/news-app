import { MongoClient } from 'mongodb';

export default async function handler(req: any, res: any) {
  const client = await MongoClient.connect(
    'mongodb+srv://fayax555:rnsDZrSwDUd3w1F2@cluster0.jhvmq.mongodb.net/newsdatabase?retryWrites=true&w=majority'
  );

  const db = client.db();

  if (req.method === 'POST') {
    const result = await db.collection('articles').insertOne(req.body);
    console.log(result);
    req.body.id = result.insertedId;

    res.status(201).json({ message: 'Success!', article: req.body });
  }

  if (req.method === 'GET') {
  }

  client.close();
}
