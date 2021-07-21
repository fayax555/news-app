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

const fileInputHandler = (e: any) => {
  console.log(e.target.files[0]);
};

const fileUploadHandler = (e: any) => {
  console.log('');
};

const IndexPage = () => {
  return (
    <Layout title='Add New Article'>
      <EditorFormWrap>
        <EditorForm>
          <div>
            <h2>Add New Article</h2>
            <input type='text' placeholder='Enter title here' />
            <input type='file' onChange={fileInputHandler} />
            <button onClick={fileUploadHandler}>Upload</button>
          </div>
          <SlateWithNoSSR />
        </EditorForm>
      </EditorFormWrap>
    </Layout>
  );
};

export default IndexPage;
