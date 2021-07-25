import { Transforms, createEditor, Descendant, Editor } from 'slate';
import {
  Slate,
  Editable,
  useSlateStatic,
  useSelected,
  useFocused,
  withReact,
} from 'slate-react';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import NextImage from 'next/image';
import { ImageElement, Url } from './SlateTypes';

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
  const image: ImageElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const Image = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '20em',
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
          }}
        >
          <NextImage src={element.url} alt='' />
        </div>
      </div>
      {children}
    </div>
  );
};

export const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:');
        if (url && !isImageUrl(url)) {
          alert('URL is not an image');
          return;
        }
        insertImage(editor, url);
      }}
    >
      <i>image</i>
    </button>
  );
};

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext: any = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};
