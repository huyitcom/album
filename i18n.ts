import { Language } from './types';

export const translations: { [lang in Language]: { [key: string]: string } } = {
  en: {
    // Header
    albumSize: 'Album size',
    pagesOverview: 'Pages overview',
    totalPages: 'TOTAL PAGES',
    totalImages: 'TOTAL IMAGES',
    download: 'DOWNLOAD',
    langEN: 'EN (English)',
    langVN: 'VN (Tiếng Việt)',
    toggleOverviewTitle: 'Toggle Page Overview',
    changeLanguageTitle: 'Change language',

    // Album View
    addSpread: 'Add Spread (2 Pages)',

    // Spread
    pagesLabel: 'Pages {start}-{end}',
    dropPhotoHere: 'Drop Photo Here',
    changeLayout: 'Change Layout',
    addText: 'Add Text',
    addSticker: 'Add Sticker',

    // Image Library
    dropImagesToUpload: 'Drop images to upload',
    libraryEmptyTitle: 'Your library is empty',
    libraryEmptySubtitle: "Drag & drop photos here, or use the 'Add Photos' button.",
    designForMe: 'DESIGN FOR ME',
    designRandom: 'DESIGN RANDOM',
    clear: 'CLEAR',
    addPhotos: '+ ADD PHOTOS',
    removeImageTitle: 'Remove image',

    // Modals
    chooseLayout: 'Choose a Layout',
    designForMeTitle: '"Design For Me" - Choose an Album Theme',
    designForMeSubtitle: 'Select one layout to apply to all pages.',
    selectAlbumSize: 'Select Album Size',
    chooseTextStyle: 'Choose a Text Style',
    chooseSticker: 'Choose a Sticker',

    // Placed Image Editor
    zoom: 'Zoom:',
    rotateLeftTitle: 'Rotate Left',
    rotateRightTitle: 'Rotate Right',
    flipHorizontalTitle: 'Flip Horizontal',
    flipVerticalTitle: 'Flip Vertical',

    // Element Titles
    removeTextTitle: 'Remove text',
    removeStickerTitle: 'Remove sticker',
    rotateStickerTitle: 'Rotate sticker',
  },
  vn: {
    // Header
    albumSize: 'Kích thước album',
    pagesOverview: 'Xem tất cả trang',
    totalPages: 'TỔNG SỐ TRANG',
    totalImages: 'TỔNG SỐ ẢNH',
    download: 'TẢI XUỐNG',
    langEN: 'EN (English)',
    langVN: 'VN (Tiếng Việt)',
    toggleOverviewTitle: 'Chuyển đổi chế độ xem tổng quan',
    changeLanguageTitle: 'Thay đổi ngôn ngữ',

    // Album View
    addSpread: 'Thêm trang đôi',

    // Spread
    pagesLabel: 'Trang {start}-{end}',
    dropPhotoHere: 'Thả ảnh vào đây',
    changeLayout: 'Thay đổi bố cục',
    addText: 'Thêm chữ',
    addSticker: 'Thêm nhãn dán',

    // Image Library
    dropImagesToUpload: 'Thả ảnh để tải lên',
    libraryEmptyTitle: 'Thư viện của bạn trống',
    libraryEmptySubtitle: "Kéo và thả ảnh vào đây, hoặc sử dụng nút 'Thêm ảnh'.",
    designForMe: 'THIẾT KẾ CHO TÔI',
    designRandom: 'THIẾT KẾ NGẪU NHIÊN',
    clear: 'XÓA HẾT',
    addPhotos: '+ THÊM ẢNH',
    removeImageTitle: 'Xóa ảnh',

    // Modals
    chooseLayout: 'Chọn một bố cục',
    designForMeTitle: '"Thiết kế cho tôi" - Chọn chủ đề cho album',
    designForMeSubtitle: 'Chọn một bố cục để áp dụng cho tất cả các trang.',
    selectAlbumSize: 'Chọn kích thước Album',
    chooseTextStyle: 'Chọn một kiểu chữ',
    chooseSticker: 'Chọn một nhãn dán',
    
    // Placed Image Editor
    zoom: 'Thu phóng:',
    rotateLeftTitle: 'Xoay trái',
    rotateRightTitle: 'Xoay phải',
    flipHorizontalTitle: 'Lật ngang',
    flipVerticalTitle: 'Lật dọc',

    // Element Titles
    removeTextTitle: 'Xóa chữ',
    removeStickerTitle: 'Xóa nhãn dán',
    rotateStickerTitle: 'Xoay nhãn dán',
  }
};