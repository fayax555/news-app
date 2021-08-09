import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { customAlphabet } from 'nanoid';
import { v2 as cloudinary } from 'cloudinary';
import { Descendant } from 'slate';
const nanoid = customAlphabet('1234567890', 4);

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

type ReqBody = {
  headline: string;
  content: Descendant[];
  coverImage: {
    name: string;
    size: number;
    type: string;
    encodeData: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  const {
    headline,
    content,
    coverImage: { encodeData, name, size, type },
  } = req.body as ReqBody;

  try {
    const cloudinaryRes = await cloudinary.uploader.upload(
      `data:${type};base64,${encodeData}`,
      {
        upload_preset: 'cover_image',
      }
    );
    console.log(cloudinaryRes);

    const updatedReqBody = {
      nid: `${headline.trim().replace(/[ ]/g, '-')}-${nanoid()}`,
      headline,
      content,
      coverImage: {
        name,
        size,
        type,
        imgUrl: cloudinaryRes.secure_url,
      },
    };

    const result = await db
      .collection('articles')
      .insertOne({ ...updatedReqBody });

    res.status(201).json({ message: 'Success!', article: updatedReqBody });
  } catch (error) {
    console.log(error);
  }
}
