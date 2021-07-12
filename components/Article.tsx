import {FC} from 'react'
import styled from 'styled-components';
import Image from 'next/image';
import author from '../../assets/author.jpg';

const ArticleWrap = styled.div`
  padding-top: 2rem;
  width: 600px;

  h2 {
    padding-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  border-bottom: 1px solid #444;
  align-items: center;
  padding-bottom: 0.75rem;
  margin: 1rem 0;
  gap: 0.5rem;

  div {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }

  p {
    font-size: 0.9rem;
    /* padding-top: 0.6rem; */
  }

  p span {
    font-weight: bold;
  }
`;

interface Props {

}

const Article: FC<Props> = () => {
  return (
    <ArticleWrap>
        <h2>Relic Is Teasing Something on its Twitch Channel</h2>
        <ArticleInfo>
          <div>
            <Image src={author} alt=''></Image>
          </div>
          <p>
            By <span>John Doe</span>
          </p>
          <p>Posted: 12 Jul 2021 10:05 pm</p>
        </ArticleInfo>
        <p>
          There is something going on over on Relic Entertainment&apos; twitch
          channel. The developer seems to be broadcasting a map of the
          Mediterranean Sea shown from high above, and it is stylized in a way
          that gives off early 20th Century vibes. There is one franchise in the
          studio&apos; history that definitely aligns with this most closely,
          but just to be thorough, let&apos; explore all the possibilities.
        </p>
      </ArticleWrap>
  )
}

export default Article