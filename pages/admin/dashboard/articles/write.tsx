import { FC, FormEventHandler, useEffect, useState } from 'react'
import { Descendant } from 'slate'
import dynamic from 'next/dynamic'
import Layout from 'components/Layout/Layout'
import { Button } from 'components/Styles/Styles'
import FilePondComponent from 'components/Dashboard/Articles/Editor/FilePond'
import {
  DashboardWrite,
  EditorForm,
} from 'components/Styles/pages/DashboardStyles'
import Navbar from 'components/Dashboard/Navbar/Navbar'
import { GetServerSideProps } from 'next'
import { connectToDatabase } from 'util/mongodb'
import { Db } from 'mongodb'
import { Article } from 'components/NewsPage/ArticleTypes'
import { getSession } from 'next-auth/client'
import { Session } from 'next-auth'
import Input from 'components/Form/FormEl'
import { useRouter } from 'next/router'

const SlateEditor = dynamic(
  () => import('components/Dashboard/Articles/Editor/SlateEditor'),
  { ssr: false }
)

interface Props {
  article?: Article
  session?: Session
}

const WritePage: FC<Props> = ({ article, session }) => {
  const [headline, setHeadline] = useState(article?.headline || '')
  const [imageCaption, setImageCaption] = useState(article?.imageCaption || '')
  const [excerpt, setExcerpt] = useState(article?.excerpt || '')

  // cover image from filepond
  const [files, setFiles] = useState<any>(
    [{ source: article?.coverImage.imgUrl }] || []
  )
  // value contains the text inside the slte editor
  const [value, setValue] = useState<any>(
    article?.content || [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
  )

  const router = useRouter()

  useEffect(() => {
    // reseting the values of textboxes if the user clicks add new
    if (!router.query.id) {
      setHeadline('')
      setImageCaption('')
      setExcerpt('')
      setFiles([])
      setValue([
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ])
    }

    // change page state (to edit state) when user navigates to the edit page (eg: from the back button)
    if (router.query.id) {
      setHeadline(article?.headline || '')
      setImageCaption(article?.imageCaption || '')
      setExcerpt(article?.excerpt || '')
      setFiles([{ source: article?.coverImage.imgUrl }] || [])
      setValue(
        article?.content || [
          {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
          },
        ]
      )
    }
  }, [
    article?.content,
    article?.coverImage.imgUrl,
    article?.excerpt,
    article?.headline,
    article?.imageCaption,
    router.query.id,
  ])

  // console.log(value);

  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    setIsSubmit(true)
    console.log('submit button clicked')

    const {
      getFileEncodeBase64String,
      file: { size, type },
      filenameWithoutExtension,
    } = files[0]

    const articleData = {
      author: session?.user?.name,
      headline,
      imageCaption,
      excerpt,
      content: value,
      coverImage: {
        name: filenameWithoutExtension,
        size,
        type,
        encodeData: getFileEncodeBase64String(),
      },
    }

    fetch('/api/article/articles', {
      // update the current article if editing, otherwise insert new
      method: article ? 'PUT' : 'POST',
      body: article
        ? JSON.stringify({
            nid: article?.nid,
            views: article?.views,
            ...articleData,
          })
        : JSON.stringify(articleData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.log(error))
  }

  return (
    <Layout title='Add New Article'>
      <DashboardWrite>
        <Navbar />
        <div>
          <h2>{`${article ? 'Update' : 'Add New'}`} Article</h2>
          <EditorForm onSubmit={handleSubmit}>
            <div>
              <Input val={headline} setVal={setHeadline} ph='Headline' />
              <FilePondComponent files={files} setFiles={setFiles} />
              <Input
                val={imageCaption}
                setVal={setImageCaption}
                ph='Image Caption'
                isRequired={false}
              />
              <Input
                val={excerpt}
                setVal={setExcerpt}
                ph='Excerpt'
                isRequired={false}
              />
              <SlateEditor value={value} setValue={setValue} />
            </div>
            <div>
              <Button
                fs='1rem'
                isSubmit={isSubmit}
                disabled={false}
                type='submit'
              >
                {`${article ? 'Update' : 'Publish'}`}
              </Button>
            </div>
          </EditorForm>
        </div>
      </DashboardWrite>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context

  const session = await getSession(context)

  // if (!session) {
  //   return {
  //     notFound: true,
  //   }
  // }

  if (query.id) {
    try {
      const { db }: { db: Db } = await connectToDatabase()

      const article = await db.collection('articles').findOne({ nid: query.id })

      return {
        props: { session, article: JSON.parse(JSON.stringify(article)) },
      }
    } catch (error) {
      console.error(error)

      return {
        redirect: {
          destination: '/admin/dashboard/write',
          permanent: false,
        },
      }
    }
  }

  if (session) {
    return {
      props: { session },
    }
  }

  return {
    props: {},
  }
}

export default WritePage
