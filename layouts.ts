export interface LayoutSlot {
  id: string;
  gridArea: string;
}

export interface LayoutTemplate {
  id:string;
  name: string;
  name_vn: string;
  gridTemplateColumns: string;
  gridTemplateRows: string;
  gap: string;
  slots: LayoutSlot[];
  hideOnMobile?: boolean;
}

export const layouts: { [id: string]: LayoutTemplate } = {
  'single-full': {
    id: 'single-full',
    name: 'Full Bleed Single Image',
    name_vn: 'Một ảnh tràn lề',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    gap: '0',
    slots: [{ id: 'slot-1', gridArea: '1 / 1 / 2 / 2' }],
  },
   'two-equal-vertical-split': {
    id: 'two-equal-vertical-split',
    name: 'Two Equal Vertical (Spread)',
    name_vn: 'Hai ảnh dọc bằng nhau (Trang đôi)',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr',
    gap: '0.125rem', // 2px
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 2 / 2' },
      { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' },
    ],
  },
  'feature-left': {
    id: 'feature-left',
    name: 'Feature Left',
    name_vn: 'Nổi bật bên trái',
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 3 / 2' },
      { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' },
      { id: 'slot-3', gridArea: '2 / 2 / 3 / 3' },
    ],
  },
  'feature-right': {
    id: 'feature-right',
    name: 'Feature Right',
    name_vn: 'Nổi bật bên phải',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 2 / 3 / 3' },
      { id: 'slot-2', gridArea: '1 / 1 / 2 / 2' },
      { id: 'slot-3', gridArea: '2 / 1 / 3 / 2' },
    ],
  },
  'four-square': {
    id: 'four-square',
    name: 'Four Square',
    name_vn: 'Bốn ô vuông',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 2 / 2' },
      { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' },
      { id: 'slot-3', gridArea: '2 / 1 / 3 / 2' },
      { id: 'slot-4', gridArea: '2 / 2 / 3 / 3' },
    ]
  },
  'panorama-top-split': {
    id: 'panorama-top-split',
    name: 'Panorama Top Split',
    name_vn: 'Panorama trên',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '2fr 1fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 2 / 3' }, // panorama top
      { id: 'slot-2', gridArea: '2 / 1 / 4 / 2' }, // tall left
      { id: 'slot-3', gridArea: '2 / 2 / 3 / 3' }, // small right 1
      { id: 'slot-4', gridArea: '3 / 2 / 4 / 3' }, // small right 2
    ],
    hideOnMobile: true,
  },
  'offset-grid': {
    id: 'offset-grid',
    name: 'Offset Grid',
    name_vn: 'Lưới lệch',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 3 / 4' }, // Large top left
      { id: 'slot-2', gridArea: '1 / 4 / 3 / 6' }, // Large top right
      { id: 'slot-3', gridArea: '3 / 1 / 5 / 3' }, // Med bottom left
      { id: 'slot-4', gridArea: '3 / 3 / 5 / 6' }, // Large bottom right
    ],
  },
  'vertical-stack-right': {
    id: 'vertical-stack-right',
    name: 'Vertical Stack Right',
    name_vn: 'Chồng dọc bên phải',
    gridTemplateColumns: '3fr 2fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 4 / 2' }, // Full height left
      { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' }, // Top right
      { id: 'slot-3', gridArea: '2 / 2 / 3 / 3' }, // Middle right
      { id: 'slot-4', gridArea: '3 / 2 / 4 / 3' }, // Bottom right
    ],
    hideOnMobile: true,
  },
  'five-photo-story': {
    id: 'five-photo-story',
    name: 'Five Photo Story',
    name_vn: 'Câu chuyện năm ảnh',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '2fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 2 / 5' }, // Panorama top
      { id: 'slot-2', gridArea: '2 / 1 / 3 / 2' },
      { id: 'slot-3', gridArea: '2 / 2 / 3 / 3' },
      { id: 'slot-4', gridArea: '2 / 3 / 3 / 4' },
      { id: 'slot-5', gridArea: '2 / 4 / 3 / 5' },
    ],
    hideOnMobile: true,
  },
  'left-triple-stack': {
    id: 'left-triple-stack',
    name: 'Left Triple Stack',
    name_vn: 'Ba ảnh dọc bên trái',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '8px',
    slots: [
        { id: 'slot-1', gridArea: '1 / 2 / 4 / 3' },
        { id: 'slot-2', gridArea: '1 / 1 / 2 / 2' },
        { id: 'slot-3', gridArea: '2 / 1 / 3 / 2' },
        { id: 'slot-4', gridArea: '3 / 1 / 4 / 2' }
    ],
    hideOnMobile: true,
  },
  'left-split-feature': {
    id: 'left-split-feature',
    name: 'Left Split Feature',
    name_vn: 'Nổi bật chia đôi trái',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '2fr 1fr',
    gap: '8px',
    slots: [
        { id: 'slot-1', gridArea: '1 / 2 / 3 / 3' },
        { id: 'slot-2', gridArea: '1 / 1 / 2 / 2' },
        { id: 'slot-3', gridArea: '2 / 1 / 3 / 2' }
    ]
  },
  'offset-vertical-split': {
    id: 'offset-vertical-split',
    name: 'Offset Vertical Split',
    name_vn: 'Chia dọc lệch',
    gridTemplateColumns: '2fr 3fr',
    gridTemplateRows: '1fr',
    gap: '8px',
    slots: [
        { id: 'slot-1', gridArea: '1 / 1 / 2 / 2' },
        { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' }
    ]
  },
  'trio-left-tall': {
    id: 'trio-left-tall',
    name: 'Trio Left Tall',
    name_vn: 'Bộ ba dọc trái',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '8px',
    slots: [
        { id: 'slot-1', gridArea: '1 / 1 / 3 / 2' },
        { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' },
        { id: 'slot-3', gridArea: '2 / 2 / 3 / 3' }
    ]
  },
  'main-left-vertical': {
    id: 'main-left-vertical',
    name: 'Main Left Vertical',
    name_vn: 'Ảnh chính dọc trái',
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: '1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 2 / 2' },
      { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' },
    ],
  },
  'centered-horizontal-pair': {
    id: 'centered-horizontal-pair',
    name: 'Centered Horizontal Pair',
    name_vn: 'Cặp ảnh ngang giữa',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 2fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '2 / 1 / 3 / 2' },
      { id: 'slot-2', gridArea: '2 / 2 / 3 / 3' },
    ],
  },
  'tall-with-two-sides': {
    id: 'tall-with-two-sides',
    name: 'Tall with Two Sides',
    name_vn: 'Dọc với hai bên',
    gridTemplateColumns: '2fr 1fr 1fr',
    gridTemplateRows: '1fr',
    gap: '8px',
    slots: [
        { id: 'slot-1', gridArea: '1 / 1 / 2 / 2' },
        { id: 'slot-2', gridArea: '1 / 2 / 2 / 3' },
        { id: 'slot-3', gridArea: '1 / 3 / 2 / 4' }
    ]
  },
  'asymmetric-four': {
    id: 'asymmetric-four',
    name: 'Asymmetric Four',
    name_vn: 'Bốn ảnh bất đối xứng',
    gridTemplateColumns: '1fr 1fr 2fr',
    gridTemplateRows: '1fr 1fr',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 3 / 3 / 4' }, // large right vertical
      { id: 'slot-2', gridArea: '1 / 1 / 2 / 2' }, // top left
      { id: 'slot-3', gridArea: '1 / 2 / 2 / 3' }, // top middle
      { id: 'slot-4', gridArea: '2 / 1 / 3 / 3' }, // bottom left wide
    ],
  },
  'mosaic-story': {
    id: 'mosaic-story',
    name: 'Mosaic Story',
    name_vn: 'Câu chuyện Mosaic',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '8px',
    slots: [
      { id: 'slot-1', gridArea: '1 / 1 / 2 / 3' }, // top-1
      { id: 'slot-2', gridArea: '1 / 3 / 2 / 5' }, // top-2
      { id: 'slot-3', gridArea: '2 / 1 / 4 / 3' }, // main-l
      { id: 'slot-4', gridArea: '2 / 3 / 3 / 5' }, // side-1
      { id: 'slot-5', gridArea: '3 / 3 / 4 / 5' }, // side-2
    ],
    hideOnMobile: true,
  },
};

export const layoutList = Object.values(layouts);