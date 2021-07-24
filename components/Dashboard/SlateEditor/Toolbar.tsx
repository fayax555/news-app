import { FC } from 'react';
import { CustomEditor, TextFormat, BlockType } from './SlateHelpers';
import styled from 'styled-components';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from 'react-icons/md';
import { BsTypeH2, BsTypeH3 } from 'react-icons/bs';
import { useSlate } from 'slate-react';

const ToolbarWrap = styled.div`
  padding-top: 0.2rem;
  background-color: #ddd;
`;

const Icon = styled.i<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0.5rem;
  padding: 0.2rem 0.2rem 0rem 0.2rem;
  color: ${(props) => (props.isActive ? '#1A73E8' : '#444')};
  background-color: ${(props) => (props.isActive ? '#adabab83' : '#ddd')};

  &:hover {
    background-color: #bbb;
    /* opacity: 1; */
  }
`;

interface Props {
  elementType?: string | undefined;
}

const Toolbar: FC<Props> = () => {
  const { isBlockActive, toggleBlock, toggleMark } = CustomEditor;
  const editor = useSlate();

  const formatInlineData = [
    { icon: <MdFormatBold />, formatType: 'bold' },
    { icon: <MdFormatItalic />, formatType: 'italic' },
    { icon: <MdFormatUnderlined />, formatType: 'underline' },
  ];

  const formatBlockData = [
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
          isActive={CustomEditor.isMarkActive(
            editor,
            data.formatType as TextFormat
          )}
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
