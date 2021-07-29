import { Editor, Transforms } from 'slate';

export const YoutubeEmbed = (event: any, editor: Editor) => {
  const youtubeRegex =
    /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube\.com|youtu.be))(?:\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(?:\S+)?$/;
  const pastedText = event.clipboardData?.getData('text')?.trim();
  console.log(event.clipboardData.getData('text'));
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
};
