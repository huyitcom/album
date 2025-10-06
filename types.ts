export interface AlbumImage {
  id: string;
  url: string;
  used: number;
  linked?: boolean;
}

export interface ImageTransform {
  x: number; // in percentage
  y: number; // in percentage
  scale: number;
  rotation: number; // in degrees
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface PlacedImageData {
  image: AlbumImage;
  transform: ImageTransform;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'center' | 'right';
  textShadow?: string;
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  background?: string;
}

export interface TextElement {
  id: string;
  content: string;
  x: number; // in percentage
  y: number; // in percentage
  width: number; // in pixels
  height: number; // in pixels
  style: TextStyle;
}

export interface StickerElement {
  id: string;
  url: string;
  x: number; // in percentage
  y: number; // in percentage
  width: number; // in pixels
  height: number; // in pixels
  rotation: number; // in degrees
}

export interface SpreadData {
  id: string;
  pages: [number, number];
  layoutId: string;
  images: { [slotId: string]: PlacedImageData };
  texts: TextElement[];
  stickers: StickerElement[];
}

export type AlbumSize = '30x30' | '25x35';
export type Language = 'en' | 'vn';