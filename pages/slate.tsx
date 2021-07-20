import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Layout from 'components/Layout/Layout';

const EditorFormWrap = styled.div`
  background-color: #f3f3f3;
  min-height: 100vh;
`;

const EditorForm = styled.div`
  max-width: 670px;
  padding: 1rem;
  margin: auto;

  > div:first-child {
    padding: 1rem 0;

    input {
      width: 100%;
      font-size: 1.2rem;
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
      <EditorFormWrap>
        <EditorForm>
          <div>
            <h2>Add New Article</h2>
            <input type='text' placeholder='Enter title here' />
          </div>
          <SlateWithNoSSR />
        </EditorForm>
      </EditorFormWrap>
    </Layout>
  );
};

export default IndexPage;
