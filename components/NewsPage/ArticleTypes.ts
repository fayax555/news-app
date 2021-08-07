import { ReactElement } from 'react';

export interface Article {
  _id: string;
  nid: string;
  headline: string;
  content: any;
  coverImage: {
    encodeData: string;
    name: string;
    size: number;
    type: string;
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
