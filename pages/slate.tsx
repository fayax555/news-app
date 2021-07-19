import SlateEditor from 'components/Dashboard/SlateEditor';

import dynamic from 'next/dynamic'

const SlateWithNoSSR = dynamic(
  () => import('components/Dashboard/SlateEditor'),
  { ssr: false }
)

const IndexPage = () => {
  return <SlateWithNoSSR />;
};

export default IndexPage;
