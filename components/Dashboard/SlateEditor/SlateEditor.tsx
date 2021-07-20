import { FC, useCallback, useMemo, useState } from 'react';
import { createEditor, BaseEditor, Descendant, Editor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import {
  CustomEditor,
  Leaf,
  CodeElement,
  DefaultElement,
} from './SlateHelpers';
import Toolbar from './Toolbar';
import { EditorWrap, Wrap } from './EditorStyles';
import { withHistory } from 'slate-history';

type CustomElement = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  type: 'paragraph' | 'code' | null;
  children: CustomText[];
};

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
  // const [isBold, setIsBold] = useState(false);
  // const [isItalic, setIsItalic] = useState(false);
  // const [isUnderline, setIsUnderline] = useState(false);
  const [activeMarks, setActiveMarks] = useState<string[]>([]);

  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const handleActiveMarks = () => {
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
                  CustomEditor.toggleCodeBlock(editor);
                  break;
                }

                case 'b': {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                  break;
                }
                case 'i': {
                  event.preventDefault();
                  CustomEditor.toggleItalicMark(editor);
                  break;
                }
                case 'u': {
                  event.preventDefault();
                  CustomEditor.toggleUnderlineMark(editor);
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
