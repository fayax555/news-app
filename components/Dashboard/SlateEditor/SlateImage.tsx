import { Transforms, Editor } from 'slate';
import { useSlateStatic, useSelected, useFocused } from 'slate-react';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import { ImageElement, Url } from './SlateTypes';
import { MdImage } from 'react-icons/md';
import { useState } from 'react';

export const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor: Editor, url: Url) => {
  const text = { text: '' };
  const image: any = [
    {
      type: 'image',
      url,
      children: [text],
    },
    { type: 'paragraph', children: [{ text: '' }] },
  ];

  Transforms.insertNodes(editor, image);
};

export const Image = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();
  // console.log(children);

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            maxWidth: '100%',
            maxHeight: '20em',
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
          }}
          src={element.url}
          alt=''
        />
      </div>
      {children}
    </div>
  );
};

export const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <MdImage
      onMouseDown={(event) => {
        event.preventDefault();

        const url = window.prompt('Enter the URL of the image:');

        if (!url) return false;
        // if (!isImageUrl(url)) {
        //   alert('URL is not an image');
        //   return;
        // }
        insertImage(editor, url);
      }}
    />
  );
};

const isImageUrl = (url: string | null) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext: string = String(new URL(url).pathname.split('.').pop());
  return imageExtensions.includes(ext);
};
