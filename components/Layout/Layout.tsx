import { ReactNode } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MenuBars from './MenuBars/MenuBars';
import Footer from 'components/Dashboard/Navbar/Footer';

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
      <MenuBars />
      {children}
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: 'Newz | A News App',
  description: 'A news app with its own CMS created with Next.js and MongoDB',
  keywords: 'news, next.js, mongodb, cms, maldives',
};
