import { connectToDatabase } from 'util/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary'
import { Content } from 'components/NewsPage/ArticleTypes'
import { ObjectId, Db } from 'mongodb'
import { getSession } from 'next-auth/client'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface ReqBody {
  author: string
  headline: string
  imageCaption?: string
  excerpt?: string
  content: Content[]
  coverImage: {
    name: string
    size: number
    type: string
    encodeData: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  // if (!session) {
  //   return res.status(401).json({ message: 'Unauthorized access not allowed' });
  // }

  const { db }: { db: Db } = await connectToDatabase()

  const count = await db.collection('articles').countDocuments()
  const nid = req.method === 'PUT' ? req.body.nid : String(count + 1)

  const {
    author,
    headline,
    content,
    excerpt,
    imageCaption,
    coverImage: { encodeData, name, size, type },
  } = req.body as ReqBody

  console.log(nid)

  const contentRes = content.map(async (c) => {
    if (c.type === 'image') {
      const cloudinaryEditorImages = await cloudinary.uploader.upload(
        String(c.url),
        {
          upload_preset: 'editor',
        }
      )

      c.url = cloudinaryEditorImages.secure_url

      // probably would work without the return statement
      return cloudinaryEditorImages.secure_url
    }
  })

  try {
    const cloudinaryRes = await cloudinary.uploader.upload(
      `data:${type};base64,${encodeData}`,
      {
        upload_preset: 'cover_image',
      }
    )

    // console.log(encodeData)

    fs.writeFile(
      `public/static/images/${nid}.png`,
      encodeData,
      'base64',
      function (err: any) {
        console.log(err)
      }
    )

    await Promise.all([...contentRes]).then(async () => {
      const updatedReqBody = {
        nid,
        author,
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
        views: req.body.views || 0,
        createdAt: Date(),
      }

      if (req.method === 'POST') {
        await db.collection('articles').insertOne(updatedReqBody)

        return res
          .status(201)
          .json({ message: 'Inserted!', article: updatedReqBody })
      }

      if (req.method === 'PUT') {
        await db
          .collection('articles')
          .findOneAndReplace({ nid: req.body.nid }, updatedReqBody)

        return res
          .status(201)
          .json({ message: 'Updated!', article: updatedReqBody })
      }
    })
  } catch (error) {
    console.error(error)
    res.end()
  }
}
