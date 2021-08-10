import { FC } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';

interface Props {
  props: {
    nid: string;
    headline: string;
    excerpt?: string;
    imgUrl: string;
    height: number;
    width: number;
  };
}

const ArticleItem: FC<Props> = ({
  props: { nid, headline, imgUrl, height, width, excerpt },
}) => {
  return (
    <Link key={nid} href={`/news/${nid}`} passHref>
      <a>
        <div>
          <Image src={imgUrl} height={height} width={width} alt='' />
        </div>
        <h2>{headline.slice(0, 180)}</h2>
        <p>{excerpt}</p>
      </a>
    </Link>
  );
};

export default ArticleItem;
