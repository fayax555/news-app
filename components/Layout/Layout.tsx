import { ReactNode } from 'react';
import Head from 'next/head';
import TopBar from 'components/TopBar';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <TopBar />
      {children}
    </>
  );
}

Layout.defaultProps = {
  title: 'Newz',
};
