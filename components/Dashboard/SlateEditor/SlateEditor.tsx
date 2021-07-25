import { FC, useCallback, useMemo } from 'react';
import { createEditor, BaseEditor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { CustomEditor, Leaf, renderElement } from './SlateHelpers';
import Toolbar from './Toolbar';
import { EditorWrap, Wrap } from './EditorStyles';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import { CustomElement, SlateEditorProps, CustomText } from './SlateTypes';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const SlateEditor: FC<SlateEditorProps> = ({ value, setValue }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

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
              if (event.key === 'Enter') {
                CustomEditor.toggleBlock(editor, 'h2');
                console.log('enter key pressed');
              }

              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  //@ts-ignore
                  const mark = HOTKEYS[hotkey];
                  CustomEditor.toggleMark(editor, mark);
                }
              }
            }}
          />
        </Wrap>
      </Slate>
    </EditorWrap>
  );
};

export default SlateEditor;
