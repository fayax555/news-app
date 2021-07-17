import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import one from 'assets/sectionTwo/1.jpg';
import two from 'assets/sectionTwo/2.jpg';
import three from 'assets/sectionTwo/3.jpg';
import four from 'assets/sectionTwo/4.jpg';
import five from 'assets/sectionTwo/5.jpg';
import six from 'assets/sectionTwo/6.jpg';

const SecondSectionWrap = styled.div`
  padding: 3rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 2rem;

  h2 {
    font-size: 1.1rem;
  }

  h2:hover {
    text-decoration: underline;
  }
`;

interface Props {}

const SecondSection: FC<Props> = () => {
  const data = [
    { title: 'Is the Designer Facing Extinction?', img: one },
    { title: 'Guide to WordPress Post Revisions', img: two },
    { title: 'How To Choose The Right Hosting For Your Blog', img: three },
    { title: 'Teach Your Kids to Code Playground with Tynker', img: four },
    { title: 'Guide to WordPress Post Revisions', img: five },
    { title: 'Guide to WordPress Post Revisions', img: six },
  ];

  return (
    <SecondSectionWrap>
      {data.map(({title, img}) => (
        <Link key={title} href='' passHref>
          <a>
            <Image width={400} src={img} alt='' />
            <h2>{title}</h2>
            <p>Lorem ipsum nimi sequi perferendis commodi...</p>
          </a>
        </Link>
      ))}
    </SecondSectionWrap>
  );
};

export default SecondSection;
