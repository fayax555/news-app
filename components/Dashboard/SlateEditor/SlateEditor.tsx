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
  // const [value, setValue] = useState<Descendant[]>([
  //   {
  //     type: 'paragraph',
  //     children: [{ text: 'A line of text in a paragraph.' }],
  //   },
  // ]);

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
    <EditorWrap onClick={handleActiveMarks} onKeyDown={handleActiveMarks}>
      <Toolbar editor={editor} activeMarks={activeMarks} />
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Wrap>
          <Editable
            className='editorbox'
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case '`': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(editor, 'code');
                  break;
                }
                case 'b': {
                  event.preventDefault();
                  CustomEditor.toggleMark(editor, 'bold');
                  break;
                }
                case 'i': {
                  event.preventDefault();
                  CustomEditor.toggleMark(editor, 'italic');
                  break;
                }
                case 'u': {
                  event.preventDefault();
                  CustomEditor.toggleMark(editor, 'underline');
                  break;
                }
                case 'h': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(editor, 'h2');
                  break;
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
