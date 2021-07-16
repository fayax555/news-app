import { FC } from 'react';
import Link from 'next/link';
import ArticleList from '@/components/ArticleList';
import { NewsWrap, NewsBtnWrap } from 'components/ArticleStyles';

interface Props {
  articles: any;
}

const Home: FC<Props> = ({ articles }) => {
  return (
    <NewsWrap>
      <div>
        <Link href='/' passHref>
          <h1>News</h1>
        </Link>
      </div>
      <NewsBtnWrap>
        <Link href='/write' passHref>
          <button>Write</button>
        </Link>
      </NewsBtnWrap>
      {/* <ArticleList articles={articles} /> */}
    </NewsWrap>
  );
};

// export async function getServerSideProps() {
  

//   return {
//     props: {
//       articles: data,
//     },
//   };
// }

export default Home;
