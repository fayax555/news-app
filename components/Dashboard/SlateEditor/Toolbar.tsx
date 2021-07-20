import { FC } from 'react';
import { CustomEditor, TextFormat, BlockType } from './SlateHelpers';
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
  const formatInlineData = [
    { icon: <MdFormatBold />, formatType: 'bold' },
    { icon: <MdFormatItalic />, formatType: 'italic' },
    { icon: <MdFormatUnderlined />, formatType: 'underline' },
  ];

  const formatBlockData = [
    { icon: <BsTypeH1 />, formatType: 'h1' },
    { icon: <BsTypeH2 />, formatType: 'h2' },
    { icon: <BsTypeH3 />, formatType: 'h3' },
  ];

  return (
    <ToolbarWrap
      onMouseDown={(e) => {
        // retain focus on the editor even when the toolbar is clicked
        e.preventDefault();
      }}
    >
      {formatInlineData.map((data) => (
        <i
          key={data.formatType}
          style={{
            opacity: activeMarks.includes(data.formatType) ? 1 : 0.5,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, data.formatType as TextFormat);
          }}
        >
          {data.icon}
        </i>
      ))}

      {formatBlockData.map((data) => (
        <i
          key={data.formatType}
          style={{
            opacity: isBlockActive(editor, data.formatType as BlockType)
              ? 1
              : 0.5,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, data.formatType as BlockType);
          }}
        >
          {data.icon}
        </i>
      ))}
    </ToolbarWrap>
  );
};

export default Toolbar;
