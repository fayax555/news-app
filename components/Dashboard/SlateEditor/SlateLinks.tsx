import isUrl from 'is-url';
import { useSlate } from 'slate-react';
import { Transforms, Editor, Range, Element as SlateElement } from 'slate';
import { LinkElement, Url } from './SlateTypes';
import { MdInsertLink } from 'react-icons/md';
import { BiUnlink } from 'react-icons/bi';

export const withLinks = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor: Editor, url: Url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor: Editor, url: any) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link as any);
  } else {
    Transforms.wrapNodes(editor, link as any, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const LinkButton = () => {
  const editor = useSlate();
  
  return (
    <MdInsertLink
      // active={isLinkActive(editor)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
    />
  );
};

export const RemoveLinkButton = () => {
  const editor = useSlate();

  return (
    <BiUnlink
      onMouseDown={() => {
        if (isLinkActive(editor)) {
          unwrapLink(editor);
        }
      }}
    />
  );
};
