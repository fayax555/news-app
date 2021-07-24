import {
  FC,
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { createEditor, BaseEditor, Descendant, Editor } from 'slate';
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
  const [activeMarks, setActiveMarks] = useState<string[]>([]);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const handleActiveMarks = () => {
    // e.preventDefault() prevents editing
    const marks = Editor.marks(editor);
    if (marks !== null) {
      setActiveMarks(Object.keys(marks));
    }
  };

  return (
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar editor={editor} activeMarks={activeMarks} />
        <Editable
          className='editorbox'
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
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
      </Slate>
  );
};

export default SlateEditor;
