import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 4);
import { v2 as cloudinary } from 'cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  const {
    headline,
    coverImage: { encodeData, type },
  } = req.body;

  // console.log(encodeData);
  try {
    const imgRes = await cloudinary.uploader.upload(
      `data:${type};base64,${encodeData}`,
      {
        upload_preset: 'dev_setups',
      }
    );
    console.log(imgRes);

    const result = await db.collection('articles').insertOne({
      nid: `${headline.trim().replace(/[ ]/g, '-')}-${nanoid()}`,
      ...req.body,
    });

    res.status(201).json({ message: 'Success!', article: imgRes });
  } catch (error) {
    console.log(error);
  }
}
