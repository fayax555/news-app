import { Editor, Transforms } from 'slate';

export const Embeds = (e: any, editor: Editor) => {
  const pastedText = e.clipboardData?.getData('text')?.trim();
  console.log(e.clipboardData.getData('text'));

  if (pastedText.includes('twitter.com/') && e.key !== 'Enter') {
    e.preventDefault();

    try {
      editor.isVoid = (el) => el.type === 'tweet';
      const matches = pastedText.match(/status[^]*/)![0].replace(/\D/g, '');
      Transforms.insertNodes(editor, [
        {
          type: 'tweet',
          tweetId: matches,
          children: [
            {
              text: '',
            },
          ],
        },
        { type: 'paragraph', children: [{ text: '' }] },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  if (pastedText.includes('youtube.com/')) {
    e.preventDefault();

    try {
      editor.isVoid = (el) => el.type === 'youtube';
      const youtubeRegex =
        /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube\.com|youtu.be))(?:\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(?:\S+)?$/;
      const matches = pastedText.match(youtubeRegex);
      console.log(matches);
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
    } catch (error) {
      console.log(error);
    }
  }
};
