import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Layout from 'components/Layout/Layout';

const EditorForm = styled.div`
  max-width: 670px;
  padding: 0 1rem;
  margin: auto;

  > div:first-child {
    padding: 1rem 0;

    input {
      width: 100%;
      font-size: 0.95rem;
      display: block;
      padding: 0.5rem;
    }
  }
`;

const SlateWithNoSSR = dynamic(
  () => import('components/Dashboard/SlateEditor/SlateEditor'),
  { ssr: false }
);

const IndexPage = () => {
  return (
    <Layout>
      <EditorForm>
        <div>
          <label htmlFor='heading'>Heading</label>
          <input id='heading' type='text' />
        </div>
        <SlateWithNoSSR />
      </EditorForm>
    </Layout>
  );
};

export default IndexPage;
