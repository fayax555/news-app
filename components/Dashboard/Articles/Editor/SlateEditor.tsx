import { FC, useCallback, useRef, ClipboardEvent } from 'react';
import { createEditor, BaseEditor, Editor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { CustomEditor, Leaf, renderElement } from './SlateHelpers';
import Toolbar from './Toolbar/Toolbar';
import { EditorWrap, Wrap } from './styles';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import {
  CustomElement,
  SlateEditorProps,
  CustomText,
  TextFormat,
} from './SlateTypes';
import { withImages } from './SlateImage';
import { withLinks } from './SlateLinks';
import { Embeds } from './Embeds';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS: Record<string, TextFormat> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};

const SlateEditor: FC<SlateEditorProps> = ({ value, setValue }) => {
  const editorRef = useRef<Editor>();

  if (!editorRef.current)
    editorRef.current = withLinks(
      withImages(withHistory(withReact(createEditor())))
    );
  const editor = editorRef.current;

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <EditorWrap>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar />
        <Wrap>
          <Editable
            className='editorbox'
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  CustomEditor.toggleMark(editor, mark);
                }
              }
            }}
            onPaste={(event) =>
              Embeds(event, editor)
            }
          />
        </Wrap>
      </Slate>
    </EditorWrap>
  );
};

export default SlateEditor;
