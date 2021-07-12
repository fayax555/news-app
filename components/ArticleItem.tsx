import { FC } from 'react';
import Link from 'next/link';

interface Props {
  newsId: number;
  title: string;
  description: string;
}

const ArticleItem: FC<Props> = ({ newsId, title, description }) => {
  return (
    <div>
      <Link href={`/news/${newsId}`} passHref>
        <div>
          <a>{title}</a>
          <p>{description} ...</p>
        </div>
      </Link>
    </div>
  );
};

export default ArticleItem;
