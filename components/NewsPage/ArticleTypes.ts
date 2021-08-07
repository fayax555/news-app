export type Article = {
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
};
