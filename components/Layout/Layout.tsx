import { ReactNode } from 'react';
import Head from 'next/head';

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
      {children}
    </>
  );
}

Layout.defaultProps = {
  title: 'Mealu | Restaurant Reservation System',
};