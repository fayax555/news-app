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
  background-color: #ebdbdb;
`;

const Icon = styled.i<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0.5rem;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};

  &:hover {
    opacity: 1;
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
        <Icon
          key={data.formatType}
          isActive={activeMarks.includes(data.formatType)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, data.formatType as TextFormat);
          }}
        >
          {data.icon}
        </Icon>
      ))}

      {formatBlockData.map((data) => (
        <Icon
          key={data.formatType}
          isActive={isBlockActive(editor, data.formatType as BlockType)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, data.formatType as BlockType);
          }}
        >
          {data.icon}
        </Icon>
      ))}
    </ToolbarWrap>
  );
};

export default Toolbar;
