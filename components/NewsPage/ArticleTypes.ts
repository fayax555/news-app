import { ObjectId } from 'mongodb';
import { ReactElement } from 'react';

export interface Article {
  _id: ObjectId;
  nid: string;
  headline: string;
  imageCaption?: string;
  excerpt?: string;
  content: Content[];
  coverImage: {
    name: string;
    size: number;
    type: string;
    imgUrl: string;
  };
}

export interface Content {
  url?: string;
  children: ContentChildren[];
  type: string;
  videoId: string;
  tweetId: string;
}

export interface ContentChildren {
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
