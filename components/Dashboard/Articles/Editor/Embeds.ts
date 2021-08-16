import { ClipboardEvent } from 'react';
import { Editor, Transforms } from 'slate';

export const Embeds = (e: ClipboardEvent<HTMLDivElement>, editor: Editor) => {
  const pastedText = e.clipboardData.getData('text')?.trim();

  if (pastedText.includes('twitter.com/')) {
    if (!pastedText.match(/status[^]*/)) return;

    const matches = pastedText.match(/status[^]*/)![0].replace(/\D/g, '');

    e.preventDefault();

    editor.isVoid = (el) => el.type === 'tweet';
    Transforms.insertNodes(editor, {
      type: 'tweet',
      tweetId: matches,
      children: [
        {
          text: '',
        },
      ],
    });
  }

  if (pastedText?.includes('youtube.com/')) {
    const youtubeRegex =
      /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube\.com|youtu.be))(?:\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(?:\S+)?$/;
    const matches = pastedText.match(youtubeRegex);

    if (!matches) return;

    e.preventDefault();

    editor.isVoid = (el) => el.type === 'youtube';
    const [_, videoId] = matches;
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
};
