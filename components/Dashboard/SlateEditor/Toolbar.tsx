import { FC } from 'react';
import { CustomEditor } from './SlateHelpers';
import styled from 'styled-components';
import { BiBold, BiItalic, BiUnderline } from 'react-icons/bi';
import { BsTypeH1, BsTypeH2, BsTypeH3 } from 'react-icons/bs';

const ToolbarWrap = styled.div`
  /* padding: 0.25rem; */
  padding-top: 0.25rem;
  background-color: #f4f4f4;

  > * {
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0 0.5rem;

    &:hover {
      background: #f4f4f4;
      opacity: 0.7;
    }
  }
`;

interface Props {
  editor: any;
}

const Toolbar: FC<Props> = ({ editor }) => {
  return (
    <ToolbarWrap>
      <BiBold
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      />
      <BiItalic />
      <BiUnderline />
      <BsTypeH1 />
      <BsTypeH2 />
      <BsTypeH3 />
    </ToolbarWrap>
  );
};

export default Toolbar;
