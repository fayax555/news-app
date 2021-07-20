import { FC, useCallback, useMemo, useState } from 'react';
import { createEditor, BaseEditor, Descendant, Editor, Element } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { CustomEditor, Leaf } from './SlateHelpers';
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

type TextFormat = 'bold' | 'italic' | 'underline';
type BlockType = 'paragraph' | 'code' | 'h1' | 'h2' | 'h3' | null;
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const SlateEditor: FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [activeMarks, setActiveMarks] = useState<string[]>([]);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const renderElement = useCallback(({ element, attributes, children }) => {
    switch (element.type) {
      case 'code':
        return (
          <pre {...attributes}>
            <code>{children}</code>
          </pre>
        );
      case 'h1':
        return <h1 {...attributes}>{children}</h1>;
      case 'h2':
        return <h2 {...attributes}>{children}</h2>;
      case 'h3':
        return <h3 {...attributes}>{children}</h3>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const handleActiveMarks = (e: any) => {
    // e.preventDefault() prevents editing
    console.log(editor);
    const marks: any = Editor.marks(editor);
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
                  CustomEditor.toggleBlock(editor, 'h1');
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
