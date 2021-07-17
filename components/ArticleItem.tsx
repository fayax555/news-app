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
        <h2>{title}</h2>
        <p>{description} ...</p>
      </a>
    </Link>
  );
};

export default ArticleItem;
