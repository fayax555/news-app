import { FC, useCallback, useRef } from 'react';
import { createEditor, BaseEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { CustomEditor, Leaf, renderElement } from './SlateHelpers';
import Toolbar from './Toolbar';
import { EditorWrap, Wrap } from './EditorStyles';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import {
  CustomElement,
  SlateEditorProps,
  CustomText,
  TextFormat,
} from './SlateTypes';
import { withImages } from './SlateImage';
import { withLinks } from './SlateLinks';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS: Record<string, TextFormat> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};

const SlateEditor: FC<SlateEditorProps> = ({ value, setValue }) => {
  const editorRef = useRef<Editor>();

  if (!editorRef.current)
    editorRef.current = withLinks(
      withImages(withHistory(withReact(createEditor())))
    );
  const editor = editorRef.current;

  // editor.isVoid = (el) => {
  //   return el.type === 'youtube';
  // };
  const youtubeRegex =
    /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube\.com|youtu.be))(?:\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(?:\S+)?$/;

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <EditorWrap>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar />
        <Wrap>
          <Editable
            className='editorbox'
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  CustomEditor.toggleMark(editor, mark);
                }
              }
            }}
            onPaste={(event) => {
              const pastedText = event.clipboardData?.getData('text')?.trim();
              const matches = pastedText.match(youtubeRegex);
              if (matches != null) {
                const [_, videoId] = matches;
                event.preventDefault();
                Transforms.insertNodes(editor, [
                  {
                    type: 'youtube',
                    videoId,
                    children: [
                      {
                        text: '',
                      },
                    ],
                  },
                  { type: 'paragraph', children: [{ text: '' }] },
                ]);
              }
            }}
          />
        </Wrap>
      </Slate>
    </EditorWrap>
  );
};

export default SlateEditor;
