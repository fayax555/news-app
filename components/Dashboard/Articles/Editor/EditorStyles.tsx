import styled from 'styled-components';

export const EditorWrap = styled.div`
  border: 1px solid #ddd;
`;

export const Wrap = styled.div`
  > * {
    background-color: #fff;
    border: 1px solid #eee;
    padding: 0.5rem;
    font-size: 1.1rem;
  }
`;

export const CaptionBox = styled.blockquote`
  max-width: 700px;
  font-size: 1rem !important;
  color: #444;
`;

export const TweetWrap = styled.blockquote`
  * {
    margin: 0.1rem 0 !important;
    margin-top: 0.75rem !important;
  }
`;

export const Link = styled.a`
  color: blue;
`;
