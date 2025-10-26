

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
  filter?: string;
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

export type AlbumSize = '15x15' | '20x20' | '21x15' | '30x20' | '25x35' | '30x30';
export type Language = 'en' | 'vn';

// --- Types for Saved Project Data (in localStorage) ---

// Data structure for an image as saved (without blob URL)
export type SavedAlbumImage = Omit<AlbumImage, 'url'>;

// Data structure for a placed image as saved
export interface SavedPlacedImageData {
  image: SavedAlbumImage;
  transform: ImageTransform;
}

// Data structure for a spread as saved
// FIX: Changed from `interface extends Omit<...>` to a `type` alias with an intersection.
// An interface cannot extend a mapped type like Omit. This was the root cause of the type errors.
export type SavedSpreadData = Omit<SpreadData, 'images'> & {
  images: { [slotId: string]: SavedPlacedImageData };
};

// The full project data structure as saved
export interface SavedProjectData {
  spreads: SavedSpreadData[];
  libraryImages: SavedAlbumImage[];
  albumSize: AlbumSize;
}