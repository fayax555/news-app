import { FC } from 'react';
import Link from 'next/link';

interface Props {
  newsId: number;
  title: string;
  description: string;
}

const ArticleItem: FC<Props> = ({ newsId, title, description }) => {
  return (
    <Link href={`/news/${newsId}`} passHref>
      <a>
        <h1>{title}</h1>
        <p>{description} ...</p>
      </a>
    </Link>
  );
};

export default ArticleItem;
