import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Transforms,
  Text,
  Element,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

type CustomElement = {
  bold?: boolean;
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

const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === 'code',
    });

    return !!match;
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    const selectedText = Editor.string(editor, editor.selection);
    Transforms.setNodes(
      editor,
      { bold: isActive ? false : true },
      { match: () => !!selectedText, split: true }
    );
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const SlateEditor: FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  console.log(value);

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
    <>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        Bold
      </button>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          style={{ backgroundColor: '#ccc' }}
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
            }
          }}
        />
      </Slate>
    </>
  );
};

const Leaf: FC<any> = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

const CodeElement: FC<any> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement: FC<any> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default SlateEditor;
