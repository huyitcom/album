

import { Language } from './types';

export const translations: { [lang in Language]: { [key: string]: string } } = {
  en: {
    // Welcome Screen
    welcomeTitle: 'Album Builder',
    welcomeSubtitle: 'please choose album size to start',
    or: 'or',
    loadExistingProject: 'Load an Existing Project',
    
    // Header
    albumSize: 'Album size',
    pagesOverview: 'Pages overview',
    totalPages: 'TOTAL PAGES',
    totalImages: 'TOTAL IMAGES',
    submitProject: 'Submit Project',
    langEN: 'English',
    langVN: 'Tiếng Việt',
    toggleOverviewTitle: 'Toggle Page Overview',
    changeLanguageTitle: 'Change language',
    myProjects: 'My Projects',

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
    designForMe: 'AUTO',
    designRandom: 'RANDOM',
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
    randomDesignTitle: 'Configure Random Design',
    randomDesignSubtitle: 'Select which layouts to include in the randomization.',
    selectAll: 'Select All',
    selectNone: 'Deselect All',
    cancel: 'Cancel',
    confirmRandomization: 'Randomize with {count} Layouts',

    // Project Manager Modal
    projectManagerTitle: 'Project Manager',
    saveAsNewProject: 'Save As New Project',
    projectNamePlaceholder: 'Enter project name...',
    save: 'Save',
    saving: 'Saving...',
    load: 'Load',
    delete: 'Delete',
    noSavedProjects: 'No saved projects yet.',
    confirmDelete: 'Are you sure?',
    newProject: 'New Project',
    confirmNewProject: 'Are you sure you want to start a new project? Any unsaved changes will be lost.',
    currentProject: 'Current Project',

    // Submission Modal
    submissionTitle: 'Submit Your Project',
    submissionFormTitle: 'Your Order Details',
    submissionOrderDetailsMessage: 'Please provide your contact information so we can process your order.',
    fullNameLabel: 'Full Name',
    phoneLabel: 'Mobile Phone',
    emailLabel: 'Email (Optional)',
    addressLabel: 'Shipping Address (Optional)',
    validationFullNameRequired: 'Full name is required.',
    validationPhoneRequired: 'Mobile phone is required.',
    submissionButton: 'Submit Project to Production',
    submissionPreparing: 'Generating print-ready files...',
    submissionUploading: 'Uploading...',
    submissionSuccessTitle: 'Project Submitted Successfully!',
    submissionSuccessMessage: 'Your project has been sent to production. We will contact you shortly.',
    submissionErrorTitle: 'Upload Failed',
    submissionErrorMessage: 'An error occurred while submitting your project. Please check your internet connection and try again.',
    submissionErrorAutoSaveFailed: 'Auto-save failed before submission. Please try saving manually from the Project Manager.',
    submissionErrorNoImages: 'Cannot submit a project with no images. Please add photos to your library first.',
    submissionErrorNoPlacedImages: 'Cannot submit a project with no photos placed in the album. Please drag your photos from the library onto the pages first.',
    submissionWaitMessage: 'Please keep this window open. High-resolution rendering may take several minutes for large albums.',
    retry: 'Retry',
    close: 'Close',

    // Placed Image Editor
    zoom: 'Zoom:',
    rotateLeftTitle: 'Rotate Left',
    rotateRightTitle: 'Rotate Right',
    flipHorizontalTitle: 'Flip Horizontal',
    flipVerticalTitle: 'Flip Vertical',
    doubleClickToEdit: 'Double click to edit photo',
    doubleTapToEdit: 'Tap twice to edit photo',

    // Element Titles
    removeTextTitle: 'Remove text',
    removeStickerTitle: 'Remove sticker',
    rotateStickerTitle: 'Rotate sticker',
    mobileDragHint: 'Touch and hold to move the photo.',

    // AI Story Modal
    aiStoryTitle: 'AI Generated Story',
    aiStoryGenerating: 'Generating your story...',
    copied: 'Copied!',
    copyToClipboard: 'Copy to Clipboard',
  },
  vn: {
    // Welcome Screen
    welcomeTitle: 'Tự Thiết Kế Album',
    welcomeSubtitle: 'Vui lòng chọn kích thước album',
    or: 'hoặc',
    loadExistingProject: 'Mở một dự án có sẵn',

    // Header
    albumSize: 'Kích thước album',
    pagesOverview: 'Xem tất cả trang',
    totalPages: 'TỔNG SỐ TRANG',
    totalImages: 'TỔNG SỐ ẢNH',
    submitProject: 'Hoàn tất & Đặt hàng',
    langEN: 'English',
    langVN: 'Tiếng Việt',
    toggleOverviewTitle: 'Chuyển đổi chế độ xem tổng quan',
    changeLanguageTitle: 'Thay đổi ngôn ngữ',
    myProjects: 'Dự án của tôi',

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
    designForMe: 'TỰ ĐỘNG',
    designRandom: 'NGẪU NHIÊN',
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
    randomDesignTitle: 'Cấu hình Thiết kế Ngẫu nhiên',
    randomDesignSubtitle: 'Chọn các bố cục bạn muốn sử dụng để tạo ngẫu nhiên.',
    selectAll: 'Chọn tất cả',
    selectNone: 'Bỏ chọn tất cả',
    cancel: 'Hủy',
    confirmRandomization: 'Tạo ngẫu nhiên với {count} bố cục',

    // Project Manager Modal
    projectManagerTitle: 'Quản lý dự án',
    saveAsNewProject: 'Lưu thành dự án mới',
    projectNamePlaceholder: 'Nhập tên dự án...',
    save: 'Lưu',
    saving: 'Đang lưu...',
    load: 'Tải',
    delete: 'Xóa',
    noSavedProjects: 'Chưa có dự án nào được lưu.',
    confirmDelete: 'Bạn chắc chứ?',
    newProject: 'Dự án mới',
    confirmNewProject: 'Bạn có chắc chắn muốn bắt đầu một dự án mới không? Mọi thay đổi chưa được lưu sẽ bị mất.',
    currentProject: 'Dự án hiện tại',

    // Submission Modal
    submissionTitle: 'Gửi dự án của bạn',
    submissionFormTitle: 'Thông tin đơn hàng của bạn',
    submissionOrderDetailsMessage: 'Vui lòng cung cấp thông tin liên hệ của bạn để chúng tôi có thể xử lý đơn hàng.',
    fullNameLabel: 'Họ và Tên',
    phoneLabel: 'Số Điện Thoại',
    emailLabel: 'Email (Không bắt buộc)',
    addressLabel: 'Địa chỉ giao hàng (Không bắt buộc)',
    validationFullNameRequired: 'Vui lòng nhập họ và tên.',
    validationPhoneRequired: 'Vui lòng nhập số điện thoại.',
    submissionButton: 'Xác nhận đặt hàng',
    submissionPreparing: 'Đang tạo các file sẵn sàng để in...',
    submissionUploading: 'Đang tải lên...',
    submissionSuccessTitle: 'Gửi đơn hàng thành công!',
    submissionSuccessMessage: 'Album của bạn đã được gửi đi sản xuất. Chúng tôi sẽ liên hệ với bạn sớm.',
    submissionErrorTitle: 'Tải lên thất bại',
    submissionErrorMessage: 'Đã xảy ra lỗi khi gửi dự án của bạn. Vui lòng kiểm tra kết nối internet và thử lại.',
    submissionErrorAutoSaveFailed: 'Tự động lưu không thành công trước khi gửi. Vui lòng thử lưu thủ công từ Trình quản lý dự án.',
    submissionErrorNoImages: 'Không thể gửi dự án không có ảnh. Vui lòng thêm ảnh vào thư viện trước.',
    submissionErrorNoPlacedImages: 'Không thể gửi dự án không có ảnh nào được đặt trong album. Vui lòng kéo ảnh từ thư viện vào các trang trước.',
    submissionWaitMessage: 'Vui lòng giữ cửa sổ này mở. Việc kết xuất ở độ phân giải cao có thể mất vài phút đối với các album lớn.',
    retry: 'Thử lại',
    close: 'Đóng',
    
    // Placed Image Editor
    zoom: 'Thu phóng:',
    rotateLeftTitle: 'Xoay trái',
    rotateRightTitle: 'Xoay phải',
    flipHorizontalTitle: 'Lật ngang',
    flipVerticalTitle: 'Lật dọc',
    doubleClickToEdit: 'Nhấp đúp để sửa ảnh',
    doubleTapToEdit: 'Chạm hai lần để sửa ảnh',

    // Element Titles
    removeTextTitle: 'Xóa chữ',
    removeStickerTitle: 'Xóa nhãn dán',
    rotateStickerTitle: 'Xoay nhãn dán',
    mobileDragHint: 'Chạm và giữ để di chuyển ảnh.',

    // AI Story Modal
    aiStoryTitle: 'Câu chuyện do AI tạo',
    aiStoryGenerating: 'Đang tạo câu chuyện của bạn...',
    copied: 'Đã sao chép!',
    copyToClipboard: 'Sao chép',
  }
};