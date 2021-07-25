import {
  FC,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import {
  CustomEditor,
  Leaf,
  renderElement,
  TextFormat,
  BlockType,
} from './SlateHelpers';
import Toolbar from './Toolbar';
import { EditorWrap, Wrap } from './EditorStyles';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

type CustomElement = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  active?: boolean;
  format?: TextFormat;
  type: BlockType;
  children: CustomText[];
};

type CustomText = {
  text: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface Props {
  value: Descendant[];
  setValue: Dispatch<SetStateAction<Descendant[]>>;
}

const SlateEditor: FC<Props> = ({ value, setValue }) => {
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
