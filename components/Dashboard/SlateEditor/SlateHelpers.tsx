import { FC } from 'react';
import { Editor, Transforms } from 'slate';

export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isItalicMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.italic === true,
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

  toggleItalicMark(editor: any) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    const selectedText = Editor.string(editor, editor.selection);
    Transforms.setNodes(
      editor,
      { italic: isActive ? false : true },
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

export const Leaf: FC<any> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  return <span {...attributes}>{children}</span>;
};

export const CodeElement: FC<any> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const DefaultElement: FC<any> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
