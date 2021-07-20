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
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;

interface Props {
  editor: any;
  activeMarks: string[];
  elementType?: string | undefined;
}

const Toolbar: FC<Props> = ({ editor, activeMarks }) => {
  const { isBlockActive, toggleBlock, toggleMark } = CustomEditor;
  return (
    <ToolbarWrap
      onMouseDown={(e) => {
        // retain focus on the editor even when the toolbar is clicked
        e.preventDefault();
      }}
    >
      <MdFormatBold
        style={{
          opacity: activeMarks.includes('bold') ? 1 : 0.5,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, 'bold');
        }}
      />
      <MdFormatItalic
        style={{
          opacity: activeMarks.includes('italic') ? 1 : 0.5,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, 'italic');
        }}
      />
      <MdFormatUnderlined
        style={{
          opacity: activeMarks.includes('underline') ? 1 : 0.5,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, 'underline');
        }}
      />

      <BsTypeH1
        style={{ opacity: isBlockActive(editor, 'h1') ? 1 : 0.5 }}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, 'h1');
        }}
      />
      <BsTypeH2
        style={{ opacity: isBlockActive(editor, 'h2') ? 1 : 0.5 }}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, 'h2');
        }}
      />
      <BsTypeH3
        style={{ opacity: isBlockActive(editor, 'h3') ? 1 : 0.5 }}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, 'h3');
        }}
      />
      <i>{BsTypeH3}</i>
    </ToolbarWrap>
  );
};

export default Toolbar;
