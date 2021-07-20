import { FC } from 'react';
import { CustomEditor } from './SlateHelpers';
import styled from 'styled-components';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from 'react-icons/md';
import { BsTypeH1, BsTypeH2, BsTypeH3 } from 'react-icons/bs';

const ToolbarWrap = styled.div`
  padding-top: 0.55rem;
  background-color: #ddd;

  > * {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0.5rem;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`;

interface Props {
  editor: any;
  activeMarks: string[];
}

const Toolbar: FC<Props> = ({ editor, activeMarks }) => {
  return (
    <ToolbarWrap
      onMouseDown={(e) => {
        // retain focus on the editor even when the toolbar is clicked
        e.preventDefault();
      }}
    >
      <MdFormatBold
        style={{
          opacity: activeMarks.includes('bold') ? 1 : 0.6,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleMark(editor, 'bold');
        }}
      />
      <MdFormatItalic
        style={{
          opacity: activeMarks.includes('italic') ? 1 : 0.6,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleMark(editor, 'italic');
        }}
      />
      <MdFormatUnderlined
        style={{
          opacity: activeMarks.includes('underline') ? 1 : 0.6,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleMark(editor, 'underline');
        }}
      />
      {/* <BsTypeH1
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleH1Block(editor);
        }}
      /> */}
      <BsTypeH2 />
      <BsTypeH3 />
    </ToolbarWrap>
  );
};

export default Toolbar;
