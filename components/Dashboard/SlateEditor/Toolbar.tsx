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
  /* padding: 0.25rem; */
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
  activeMarks: any;
}

const Toolbar: FC<Props> = ({
  editor,
  activeMarks: { isBold, isItalic, isUnderline },
}) => {
  return (
    <ToolbarWrap>
      <MdFormatBold
        style={{
          opacity: isBold ? 1 : 0.6,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      />
      <MdFormatItalic
        style={{
          opacity: isItalic ? 1 : 0.6,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleItalicMark(editor);
        }}
      />
      <MdFormatUnderlined
        style={{
          opacity: isUnderline ? 1 : 0.6,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleUnderlineMark(editor);
        }}
      />
      {/* <BsTypeH1 />
      <BsTypeH2 />
      <BsTypeH3 /> */}
    </ToolbarWrap>
  );
};

export default Toolbar;
