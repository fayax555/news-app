import { connectToDatabase } from 'util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { Content } from 'components/NewsPage/ArticleTypes';

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
  if (req.method === 'POST') {
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

      const d = (start: number, end: number) =>
        new Date().toString().slice(start, end);

      const month = new Date().toISOString().slice(5, 7);
      const dateString =
        d(13, 15) + month + d(8, 10) + d(16, 18) + d(19, 21) + d(22, 24);

      await Promise.all([...contentRes]).then(async () => {
        const updatedReqBody = {
          nid: String(Number(dateString) - 210810103833),
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
          date: new Date(),
        };

        await db.collection('articles').insertOne({ ...updatedReqBody });

        res.status(201).json({ message: 'Success!', article: updatedReqBody });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
