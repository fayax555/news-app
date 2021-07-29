import { Dispatch, SetStateAction } from 'react';
import { Descendant } from 'slate';

export type CustomElement = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  active?: boolean;
  format?: TextFormat;
  type: BlockType | 'link';
  children: CustomText[];
  videoId?: string;
};

export type CustomText = {
  text: string;
};

export interface SlateEditorProps {
  value: Descendant[];
  setValue: Dispatch<SetStateAction<Descendant[]>>;
}

export type TextFormat = 'bold' | 'italic' | 'underline';
export type BlockType =
  | 'paragraph'
  | 'code'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'image'
  | 'youtube'
  | null;

export type ImageElement = {
  type: 'image' | 'paragraph';
  url?: Url;
  children: EmptyText[];
};

export type Url = string | ArrayBuffer | null;

export type EmptyText = {
  text: string;
};

export type LinkElement = { type: 'link'; url: Url; children: Descendant[] };
