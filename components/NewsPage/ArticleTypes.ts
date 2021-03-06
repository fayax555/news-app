import { ReactElement } from 'react';

export interface Article {
  _id: string;
  nid: string;
  author?: string;
  headline: string;
  imageCaption?: string;
  excerpt?: string;
  content: Content[];
  date?: string;
  coverImage: {
    name: string;
    size: number;
    type: string;
    imgUrl: string;
  };
  views?: number;
  comments?: Comment[];
}

export interface Comment {
  cid: string;
  name: string;
  comment: string;
  status: 'pending' | 'approved';
  createdAt: string;
}

export interface UpdatedComment extends Comment {
  nid: string;
  headline: string;
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
