import { FC } from 'react';
import { CustomEditor } from './SlateHelpers';
import { TextFormat, BlockType } from './SlateTypes';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from 'react-icons/md';
import { BsTypeH2, BsTypeH3 } from 'react-icons/bs';
import { useSlate } from 'slate-react';
import { Icon, ToolbarWrap } from './ToolbarStyles';
import { InsertImageButton } from './SlateImage';

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
      <Icon active={isBlockActive(editor, 'image')}>
        <InsertImageButton />
      </Icon>
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
