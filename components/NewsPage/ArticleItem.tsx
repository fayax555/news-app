import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegClock } from 'react-icons/fa';
import dayjs from 'dayjs';
import { Article } from './ArticleTypes';

interface Props {
  article: Article;

  height: number;
  width: number;
}

const ArticleItem: FC<Props> = ({ article, height, width }) => {
  const {
    _id,
    nid,
    headline,
    excerpt,
    coverImage: { imgUrl },
  } = article;

  const dateFromObjectId = (id: string) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  const dayjsDate = dayjs(dateFromObjectId(_id));
  const dateFromNow = dayjs(dayjsDate).fromNow();

  return (
    <Link key={nid} href={`/news/${nid}`} passHref>
      <a>
        <div>
          <Image src={imgUrl} height={height} width={width} alt='' />
        </div>
        <div>
          <h2>{headline.slice(0, 180)}</h2>
          <p>{excerpt?.slice(0, 80)}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            <FaRegClock style={{ fontSize: '0.7rem' }} /> {dateFromNow}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default ArticleItem;
