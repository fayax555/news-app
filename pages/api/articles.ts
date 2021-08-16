import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { Content } from 'components/NewsPage/ArticleTypes';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
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
  imageCaption?: string;
  excerpt?: string;
  content: Content[];
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
    excerpt,
    imageCaption,
    coverImage: { encodeData, name, size, type },
  } = req.body as ReqBody;

  const contentRes = content.map(async (c) => {
    if (c.type === 'image') {
      const cloudinaryEditorImages = await cloudinary.uploader.upload(
        String(c.url),
        {
          upload_preset: 'editor',
        }
      );

      c.url = cloudinaryEditorImages.secure_url;

      // probably would work without the return statement
      return cloudinaryEditorImages.secure_url;
    }
  });

  try {
    const cloudinaryRes = await cloudinary.uploader.upload(
      `data:${type};base64,${encodeData}`,
      {
        upload_preset: 'cover_image',
      }
    );

    await Promise.all([...contentRes]).then(async () => {
      const count = await db.collection('articles').countDocuments();

      const updatedReqBody = {
        nid: String(count + 1),
        headline,
        content,
        imageCaption,
        excerpt,
        coverImage: {
          name,
          size,
          type,
          imgUrl: cloudinaryRes.secure_url,
        },
        createdAt: Date(),
      };

      console.log(req.method);

      if (req.method === 'POST') {
        await db.collection('articles').insertOne({ ...updatedReqBody });

        res.status(201).json({ message: 'Inserted!', article: updatedReqBody });
      }

      if (req.method === 'PUT') {
        const result = await db
          .collection('articles')
          .findOneAndReplace(
            { _id: new ObjectId(String(req.body._id)) },
            { ...updatedReqBody }
          );

        res.status(201).json({ message: 'Updated!', article: updatedReqBody });
        console.log(result);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
