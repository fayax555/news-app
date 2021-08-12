import { ReactNode } from 'react';
import Head from 'next/head';
import TopBar from 'components/TopBar';

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
  description: 'A news app created with Next.js with its own CMS',
  keywords: 'news, next.js, cms, maldives',
};
