import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegClock } from 'react-icons/fa';
import dayjs from 'dayjs';

interface Props {
  props: {
    _id: string;
    nid: string;
    headline: string;
    excerpt?: string;
    imgUrl: string;
    height: number;
    width: number;
  };
}

const ArticleItem: FC<Props> = ({
  props: { _id, nid, headline, imgUrl, height, width, excerpt },
}) => {
  const dateFromObjectId = (id: string) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  const date = dayjs(dateFromObjectId(_id));
  const dateFromNow = dayjs(date).fromNow();

  return (
    <Link key={nid} href={`/news/${nid}`} passHref>
      <a>
        <div>
          <Image src={imgUrl} height={height} width={width} alt='' />
        </div>
        <div>
          <h2>{headline.slice(0, 180)}</h2>
          <p>{excerpt?.slice(0, 80)}</p>
          <p style={{ fontSize: '0.9rem', color: '#aaa' }}>
            <FaRegClock style={{ fontSize: '0.7rem' }} /> {dateFromNow}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default ArticleItem;
