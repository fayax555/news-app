import { FC, useRef } from 'react';
import { CustomEditor } from './SlateHelpers';
import { TextFormat, BlockType } from './SlateTypes';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdClosedCaption,
  MdImage,
} from 'react-icons/md';
import { BsTypeH2, BsTypeH3 } from 'react-icons/bs';
import { useSlate } from 'slate-react';
import { Icon, ToolbarWrap } from './ToolbarStyles';
import { insertImage } from './SlateImage';

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
    { icon: <MdClosedCaption />, formatType: 'cc' },
  ];

  const fileUploadHandler = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        insertImage(editor, reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

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

      <Icon active={isBlockActive(editor, 'image')}>
        <input
          style={{ display: 'none' }}
          accept='image/*'
          id='upload-image'
          type='file'
          onChange={fileUploadHandler}
        />
        <label htmlFor='upload-image'>
          <MdImage />
        </label>
      </Icon>
    </ToolbarWrap>
  );
};

export default Toolbar;
