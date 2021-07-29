import styled from 'styled-components';

export const EditorWrap = styled.div`
  border: 1px solid #444;
  padding-bottom: 5rem;
`;

export const Wrap = styled.div`
  > * {
    background-color: #fff;
    border: 1px solid #eee;
    /* min-height: 500px; */
    padding: 0.5rem;
    font-size: 1.1rem;
  }
`;

export const CaptionBox = styled.blockquote`
  font-size: 0.9rem !important;
  color: #555;
`;

export const TweetWrap = styled.blockquote`
  * {
    padding: 0 !important;
    margin: 0.1rem 0 !important;
  }
`;
