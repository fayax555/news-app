import { FC, ReactNode } from 'react';
import { Editor, Transforms } from 'slate';
import { Image } from './SlateImage';
import { TextFormat, BlockType } from './SlateTypes';
import { CaptionBox, Link } from './styles';
import { Tweet } from 'react-twitter-widgets';
import styled from 'styled-components';

const TweetWrap = styled.div`
  // removing extra line at the end of tweet when editing
  > span {
    display: none;
  }
`;

export const CustomEditor = {
  isMarkActive(editor: Editor, textFormat: TextFormat) {
    const marks: any = Editor.marks(editor);

    return marks ? marks[textFormat] === true : false;
  },

  toggleMark(editor: Editor, textFormat: TextFormat) {
    const isActive = CustomEditor.isMarkActive(editor, textFormat);

    if (isActive) {
      Editor.removeMark(editor, textFormat);
    } else {
      Editor.addMark(editor, textFormat, true);
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

export const renderElement = (props: any) => {
  const { element, attributes, children } = props;

  switch (element.type) {
    case 'h1':
      return <h1 {...attributes}>{children}</h1>;
    case 'h2':
      return <h2 {...attributes}>{children}</h2>;
    case 'h3':
      return <h3 {...attributes}>{children}</h3>;
    case 'image':
      return <Image {...props} alt='' />;
    case 'cc':
      return <CaptionBox {...attributes}>{children}</CaptionBox>;
    case 'link':
      return (
        <Link {...attributes} href={element.url}>
          {children}
        </Link>
      );
    case 'youtube':
      return (
        <div {...attributes}>
          <iframe
            contentEditable={false}
            title='Youtube video'
            src={`https://www.youtube.com/embed/${element?.videoId}`}
            frameBorder='0'
          ></iframe>
          {children}
        </div>
      );
    case 'tweet':
      return (
        <TweetWrap {...attributes} contentEditable={false}>
          <Tweet tweetId={element.tweetId} />
          {children}
        </TweetWrap>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};
