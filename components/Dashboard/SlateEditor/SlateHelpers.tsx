import { FC, ReactNode } from 'react';
import { Editor, Transforms } from 'slate';

type TextFormat = 'bold' | 'italic' | 'underline';
type BlockType = 'paragraph' | 'code' | 'h1' | 'h2' | 'h3' | null;

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

    // format text only if the editor is focused to prevent error
    if (editor.selection !== null) {
      const selectedText = Editor.string(editor, editor.selection);
      Transforms.setNodes(
        editor,
        { [textFormat]: isActive ? undefined : true },
        { match: () => !!selectedText, split: true }
      );
    }
  },

  isBlockActive(editor: Editor, blockType: BlockType) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === blockType,
    });

    return !!match;
  },

  toggleBlock(editor: Editor, blockType: BlockType) {
    const isActive = CustomEditor.isBlockActive(editor, blockType);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : blockType },
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
