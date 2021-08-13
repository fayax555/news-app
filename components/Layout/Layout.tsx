import { ReactNode } from 'react';
import Head from 'next/head';
import TopBar from 'components/TopBar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: ReactNode;
}

export default function Layout({
  title,
  description,
  keywords,
  children,
}: LayoutProps) {
  dayjs.extend(relativeTime);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <TopBar />
      {children}
    </>
  );
}

Layout.defaultProps = {
  title: 'Newz | A News App',
  description: 'A news app with its own CMS created with Next.js and MongoDB',
  keywords: 'news, next.js, mongodb, cms, maldives',
};
