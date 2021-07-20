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
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  // console.log(value);

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

  return (
    <EditorWrap
      onClick={() => {
        const marks: any = Editor.marks(editor);
        setIsBold(Object.keys(marks).includes('bold'));
        setIsItalic(Object.keys(marks).includes('italic'));
        setIsUnderline(Object.keys(marks).includes('underline'));
      }}
    >
      <Toolbar
        editor={editor}
        activeMarks={{ isBold, isItalic, isUnderline }}
      />
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Wrap>
          <Editable
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
