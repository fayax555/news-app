import { FC } from 'react';
import { CustomEditor, TextFormat, BlockType } from './SlateHelpers';
import styled, { css } from 'styled-components';
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

const active = (color: string, bgColor: string) => css`
  color: ${color};
  background-color: ${bgColor};
`;

const Icon = styled.i<{ active: boolean }>`
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0.5rem;
  padding: 0.2rem 0.2rem 0rem 0.2rem;

  ${(props) =>
    props.active ? active('#1a73e8', '#adabab83') : active('#444', '#ddd')};

  &:hover {
    background-color: #bbb;
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
          active={CustomEditor.isMarkActive(
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
          active={isBlockActive(editor, data.formatType as BlockType)}
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
