import { FC, ReactNode } from 'react';
import { Editor, Transforms } from 'slate';

type TextFormat = 'bold' | 'italic' | 'underline';

export const CustomEditor = {
  isMarkActive(editor: Editor, textFormat: TextFormat) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n[textFormat] === true,
      universal: true,
    });

    return !!match;
  },

  toggleMark(editor: any, textFormat: TextFormat) {
    const isActive = CustomEditor.isMarkActive(editor, textFormat);
    const selectedText = Editor.string(editor, editor.selection);
    Transforms.setNodes(
      editor,
      { [textFormat]: isActive ? undefined : true },
      { match: () => !!selectedText, split: true }
    );
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === 'code',
    });

    return !!match;
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

interface LeafProps {
  attributes: any;
  children: ReactNode;
  leaf: any;
}

export const Leaf: FC<LeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export const CodeElement: FC<LeafProps> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const DefaultElement: FC<LeafProps> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
