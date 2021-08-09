import { ReactElement } from 'react';
import { Descendant } from 'slate';

export interface Article {
  _id: string;
  nid: string;
  headline: string;
  imageCaption?: string;
  excerpt?: string;
  content: Descendant[];
  coverImage: {
    name: string;
    size: number;
    type: string;
    imgUrl: string;
  };
}

export interface Content {
  children: [
    {
      type: string;
      url: string;
      children: [
        {
          text: ReactElement<any, any>;
          bold: boolean;
          italic: boolean;
          underline: boolean;
        }
      ];
      text?: any;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    }
  ];
  type: string;
  videoId: string;
  tweetId: string;
}
