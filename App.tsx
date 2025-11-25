
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import AlbumView from './components/AlbumView';
import ImageLibrary from './components/ImageLibrary';
import AutoDesignLayoutPicker from './components/AutoDesignLayoutPicker';
import WelcomeScreen from './components/WelcomeScreen';
import TextTemplatePicker from './components/TextTemplatePicker';
import StickerPicker from './components/StickerPicker';
import RandomDesignLayoutPicker from './components/RandomDesignLayoutPicker';
import ProjectManager from './components/ProjectManager';
import SubmissionModal from './components/SubmissionModal';
import MobileDragHint from './components/MobileDragHint';
import MobileEditHint from './components/MobileEditHint';
import MobileDesignPicker from './components/MobileDesignPicker';
import ClientKeyInput from './components/ClientKeyInput';
import { spreadsData as initialSpreadsData, libraryImages as initialLibraryImages } from './constants';
import { layouts } from './layouts';
import { AlbumImage, SpreadData, ImageTransform, PlacedImageData, AlbumSize, TextElement, TextStyle, StickerElement, SavedProjectData, SavedAlbumImage, SavedPlacedImageData, SavedSpreadData } from './types';
import { initDB, saveImageToDB, getImageFromDB, deleteImageFromDB } from './db';
import { useI18n } from './components/i18n';

// FIX: Ensure this is a relative import, not an alias
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {

  // Check for admin route
  const [isAdminRoute] = useState(() => window.location.pathname.startsWith('/admin'));

  const [libraryImages, setLibraryImages] = useState<AlbumImage[]>(initialLibraryImages);
  const [spreads, setSpreads] = useState<SpreadData[]>(initialSpreadsData);
  const [isAutoDesignPickerOpen, setIsAutoDesignPickerOpen] = useState(false);
  const [isRandomDesignPickerOpen, setIsRandomDesignPickerOpen] = useState(false);
  const [albumSize, setAlbumSize] = useState<AlbumSize | null>(null);
  const [isAlbumSizeChosen, setIsAlbumSizeChosen] = useState(false);
  const [isOverviewMode, setIsOverviewMode] = useState(false);
  const [libraryWidth, setLibraryWidth] = useState(288); // 18rem
  const [libraryHeight, setLibraryHeight] = useState(150); // For mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [aiResolution, setAiResolution] = useState<'2K' | '4K'>('4K');
  const [clientKey, setClientKey] = useState<string | null>(null);
  const [isClientKeyModalOpen, setIsClientKeyModalOpen] = useState(false);

  const { t } = useI18n();
  
  // Element Selection State
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Picker Modals State
  const [isTextPickerOpen, setIsTextPickerOpen] = useState(false);
  const [textPickerTargetSpreadId, setTextPickerTargetSpreadId] = useState<string | null>(null);
  const [isStickerPickerOpen, setIsStickerPickerOpen] = useState(false);
  const [stickerPickerTargetSpreadId, setStickerPickerTargetSpreadId] = useState<string | null>(null);
  const [isMobileDesignPickerOpen, setIsMobileDesignPickerOpen] = useState(false);

  // Project Management State
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);
  const [currentProjectName, setCurrentProjectName] = useState<string | null>(null);
  
  // Submission State
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  
  // UX Hint State
  const [showMobileDragHint, setShowMobileDragHint] = useState(false);
  const [showMobileEditHint, setShowMobileEditHint] = useState(false);
  const [editHintTarget, setEditHintTarget] = useState<{ spreadId: string; slotId: string; } | null>(null);

  // Ref for overlay image adding
  const addOverlayImageFileInputRef = useRef<HTMLInputElement>(null);
  const [addOverlayTargetSpreadId, setAddOverlayTargetSpreadId] = useState<string | null>(null);
  
  // State for mobile touch drag-and-drop
  const [touchDragItem, setTouchDragItem] = useState<{ image: AlbumImage; x: number; y: number; width: number; height: number; } | null>(null);
  const [touchDragOverSlot, setTouchDragOverSlot] = useState<{ spreadId: string; slotId: string } | null>(null);


  const handleAppClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Deselect all elements if clicking outside an interactive element
    if (!target.closest('[data-text-element="true"]') && !target.closest('[data-text-toolbar="true"]') && !target.closest('[data-sticker-element="true"]')) {
      setSelectedTextId(null);
      setSelectedStickerId(null);
    }
  };

  useEffect(() => {
    // Load client key from localStorage
    const savedKey = localStorage.getItem('photobook_client_key');
    if (savedKey) setClientKey(savedKey);

    initDB().catch(err => console.error("Failed to initialize database:", err));
    document.addEventListener('click', handleAppClick);
    
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleWindowResize);
    
    return () => {
      document.removeEventListener('click', handleAppClick);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleSaveClientKey = (key: string) => {
      setClientKey(key);
      localStorage.setItem('photobook_client_key', key);
      setIsClientKeyModalOpen(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isMobile) {
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';

      const handleMouseMove = (moveEvent: MouseEvent) => {
          const newHeight = window.innerHeight - moveEvent.clientY;
          const minHeight = 150;
          const maxHeight = Math.min(500, window.innerHeight - 200);
          if (newHeight >= minHeight && newHeight <= maxHeight) {
              setLibraryHeight(newHeight);
          }
      };

      const handleMouseUp = () => {
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      const handleMouseMove = (moveEvent: MouseEvent) => {
          const newWidth = moveEvent.clientX;
          const minWidth = 200;
          const maxWidth = 600;
          if (newWidth >= minWidth && newWidth <= maxWidth) {
              setLibraryWidth(newWidth);
          }
      };

      const handleMouseUp = () => {
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleSelectText = (textId: string | null) => {
    setSelectedTextId(textId);
    if (textId) {
      setSelectedStickerId(null); // Deselect sticker if selecting text
    }
  };
  
  const handleSelectSticker = (stickerId: string | null) => {
    setSelectedStickerId(stickerId);
    if (stickerId) {
      setSelectedTextId(null); // Deselect text if selecting sticker
    }
  };

  const handleAddImages = (files: FileList) => {
    const newImages: AlbumImage[] = Array.from(files).map((file, index) => ({
      id: `new-img-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      used: 0,
      linked: false,
    }));

    const wasLibraryEmpty = libraryImages.length === 0;
    if (wasLibraryEmpty && newImages.length > 0) {
      // --- HINT FOR MOBILE DRAG ---
      const hintShown = localStorage.getItem('mobileDragHintShown');
      if (isMobile && !hintShown) {
        setShowMobileDragHint(true);
        localStorage.setItem('mobileDragHintShown', 'true');
      }
      // ----------------------------

      // --- HINT FOR AUTO DESIGN ---
      const designHintShown = localStorage.getItem('designForMeHintShown');
      if (!designHintShown) {
          // Use a short delay so the two hints don't appear at the same time on mobile
          setTimeout(() => {
              if (isMobile) {
                  setIsMobileDesignPickerOpen(true);
              } else {
                  setIsAutoDesignPickerOpen(true);
              }
              localStorage.setItem('designForMeHintShown', 'true');
          }, 800);
      }
      // ----------------------------
    }

    setLibraryImages(prev => [...newImages, ...prev]);
  };
  
  const handleReorderLibrary = (dragIndex: number, hoverIndex: number) => {
    setLibraryImages(prevImages => {
      const newImages = [...prevImages];
      const draggedImage = newImages.splice(dragIndex, 1)[0];
      newImages.splice(hoverIndex, 0, draggedImage);
      return newImages;
    });
  };

  const handleChangeLayout = (spreadId: string, layoutId: string) => {
    setSpreads(currentSpreads => {
        const newSpreads = [...currentSpreads];
        const spreadIndex = newSpreads.findIndex(s => s.id === spreadId);
        if (spreadIndex === -1) return currentSpreads;

        const oldSpread = newSpreads[spreadIndex];
        const imagesToReturn = Object.values(oldSpread.images).map((placed: PlacedImageData) => placed.image);

        // Decrement usage count for cleared images
        setLibraryImages(currentImages => {
            const usageToDecrement = new Map<string, number>();
            imagesToReturn.forEach(img => {
                usageToDecrement.set(img.id, (usageToDecrement.get(img.id) || 0) + 1);
            });
            return currentImages.map(libImg => {
                if (usageToDecrement.has(libImg.id)) {
                    return { ...libImg, used: libImg.used - (usageToDecrement.get(libImg.id) || 0) };
                }
                return libImg;
            });
        });

        newSpreads[spreadIndex] = {
            ...oldSpread,
            layoutId: layoutId,
            images: {}, // Clear images when changing layout
            texts: [], // Also clear text
            stickers: [], // Also clear stickers
        };
        return newSpreads;
    });
  };

  const handleDropImageInSlot = useCallback((imageId: string, spreadId: string, slotId: string) => {
      const imageToDrop = libraryImages.find(img => img.id === imageId);
      if (!imageToDrop) return;
      
      let replacedImageId: string | null = null;
      
      // Update spreads
      setSpreads(currentSpreads => {
          return currentSpreads.map(spread => {
              if (spread.id === spreadId) {
                  const newImages = { ...spread.images };
                  const existingPlacedImage = newImages[slotId];
                  if(existingPlacedImage) {
                      replacedImageId = existingPlacedImage.image.id;
                  }
                  newImages[slotId] = {
                    image: imageToDrop,
                    transform: { x: 50, y: 50, scale: 1, rotation: 0, flipHorizontal: false, flipVertical: false },
                  };
                  return { ...spread, images: newImages };
              }
              return spread;
          });
      });

      // Update library usage counts
      setLibraryImages(currentImages => {
          return currentImages.map(img => {
              if (img.id === imageId) { // Dropped image
                  return { ...img, used: (img.used || 0) + 1 };
              }
              if (img.id === replacedImageId) { // Replaced image
                  return { ...img, used: Math.max(0, (img.used || 0) - 1) };
              }
              return img;
          });
      });

      // --- HINT FOR MOBILE EDIT ---
      const editHintShown = localStorage.getItem('mobileEditHintShown');
      if (isMobile && !editHintShown) {
        setShowMobileEditHint(true);
        setEditHintTarget({ spreadId, slotId });
        localStorage.setItem('mobileEditHintShown', 'true');
      }
      // ----------------------------
  }, [libraryImages, isMobile]);

  const handleSwapImagesInSlots = (
    source: { spreadId: string; slotId: string },
    target: { spreadId: string; slotId: string }
  ) => {
    // If source and target are the same, do nothing.
    if (source.spreadId === target.spreadId && source.slotId === target.slotId) {
        return;
    }

    setSpreads(currentSpreads => {
        const sourceSpreadIndex = currentSpreads.findIndex(s => s.id === source.spreadId);
        const targetSpreadIndex = currentSpreads.findIndex(s => s.id === target.spreadId);

        if (sourceSpreadIndex === -1 || targetSpreadIndex === -1) {
            return currentSpreads;
        }

        const sourceSpread = currentSpreads[sourceSpreadIndex];
        const targetSpread = currentSpreads[targetSpreadIndex];
        
        const sourceImage = sourceSpread.images[source.slotId];
        const targetImage = targetSpread.images[target.slotId];

        if (!sourceImage) {
            // Should not happen if drag started correctly
            return currentSpreads;
        }

        const newSpreads = [...currentSpreads];
        
        // Handle case where source and target spreads are the same
        if (sourceSpreadIndex === targetSpreadIndex) {
            const newSpread = { ...sourceSpread, images: { ...sourceSpread.images } };
            
            // Move/Swap logic
            newSpread.images[target.slotId] = sourceImage;
            if (targetImage) {
                newSpread.images[source.slotId] = targetImage;
            } else {
                delete newSpread.images[source.slotId];
            }
            newSpreads[sourceSpreadIndex] = newSpread;

        } else { // Different spreads
            const newSourceSpread = { ...sourceSpread, images: { ...sourceSpread.images } };
            const newTargetSpread = { ...targetSpread, images: { ...targetSpread.images } };

            // Move/Swap logic
            newTargetSpread.images[target.slotId] = sourceImage;
            if (targetImage) {
                newSourceSpread.images[source.slotId] = targetImage;
            } else {
                delete newSourceSpread.images[source.slotId];
            }
            newSpreads[sourceSpreadIndex] = newSourceSpread;
            newSpreads[targetSpreadIndex] = newTargetSpread;
        }

        return newSpreads;
    });
  };

  const handleUpdateImageTransform = (spreadId: string, slotId: string, newTransform: ImageTransform) => {
    setSpreads(currentSpreads =>
      currentSpreads.map(spread => {
        if (spread.id === spreadId) {
          const newImages = { ...spread.images };
          const placedImage = newImages[slotId];
          if (placedImage) {
            newImages[slotId] = { ...placedImage, transform: newTransform };
            return { ...spread, images: newImages };
          }
        }
        return spread;
      })
    );
  };

  const handleRemoveImageFromSlot = (spreadId: string, slotId: string) => {
    let removedImageId: string | null = null;
    
    setSpreads(currentSpreads =>
      currentSpreads.map(spread => {
        if (spread.id === spreadId) {
          const newImages = { ...spread.images };
          if (newImages[slotId]) {
            removedImageId = newImages[slotId].image.id;
            delete newImages[slotId];
            return { ...spread, images: newImages };
          }
        }
        return spread;
      })
    );

    if (removedImageId) {
      setLibraryImages(currentImages =>
        currentImages.map(img => {
          if (img.id === removedImageId) {
            return { ...img, used: Math.max(0, (img.used || 0) - 1) };
          }
          return img;
        })
      );
    }
  };

  const handleAddSpread = () => {
    setSpreads(currentSpreads => {
      const lastSpread = currentSpreads[currentSpreads.length - 1];
      const newPageStart = lastSpread ? lastSpread.pages[1] + 1 : 1;
      const newSpread: SpreadData = {
        id: `spread${Date.now()}`,
        pages: [newPageStart, newPageStart + 1],
        layoutId: 'two-equal-vertical-split', // Default layout for new spreads
        images: {},
        texts: [],
        stickers: [],
      };
      return [...currentSpreads, newSpread];
    });
  };

  const handleReorderSpreads = (dragIndex: number, hoverIndex: number) => {
    setSpreads(currentSpreads => {
        const reorderedSpreads = [...currentSpreads];
        const [movedSpread] = reorderedSpreads.splice(dragIndex, 1);
        reorderedSpreads.splice(hoverIndex, 0, movedSpread);

        // After reordering, we need to update the page numbers to be sequential
        return reorderedSpreads.map((spread, index) => ({
            ...spread,
            pages: [index * 2 + 1, index * 2 + 2] as [number, number],
        }));
    });
  };

  const handleDesignForMe = () => {
    if (libraryImages.length > 0) {
      setIsAutoDesignPickerOpen(true);
    }
  };

  const handleAutoDesign = (layoutId: string) => {
    const selectedLayout = layouts[layoutId];
    if (!selectedLayout || selectedLayout.slots.length === 0 || libraryImages.length === 0) {
      setIsAutoDesignPickerOpen(false);
      return;
    }

    const imagesToPlace = [...libraryImages];
    let imageIndex = 0;

    const newSpreads = spreads.map(spread => {
      const newImages: { [slotId: string]: PlacedImageData } = {};
      for (const slot of selectedLayout.slots) {
        if (imageIndex < imagesToPlace.length) {
          const image = imagesToPlace[imageIndex];
          newImages[slot.id] = {
            image: image,
            transform: { x: 50, y: 50, scale: 1, rotation: 0, flipHorizontal: false, flipVertical: false },
          };
          imageIndex++;
        }
      }
      return {
        ...spread,
        layoutId: layoutId,
        images: newImages,
        texts: [],
        stickers: [],
      };
    });
    
    const usageCounts = new Map<string, number>();
    newSpreads.forEach(spread => {
        Object.values(spread.images).forEach((placedImage: PlacedImageData) => {
            usageCounts.set(placedImage.image.id, (usageCounts.get(placedImage.image.id) || 0) + 1);
        });
    });

    const newLibraryImages = libraryImages.map(img => ({
        ...img,
        used: usageCounts.get(img.id) || 0,
    }));

    setSpreads(newSpreads);
    setLibraryImages(newLibraryImages);
    setIsAutoDesignPickerOpen(false);
  };

  const handleDesignRandom = () => {
    if (libraryImages.length === 0) return;
    setIsRandomDesignPickerOpen(true);
  };

  const handleConfirmRandomDesign = (selectedLayoutIds: string[]) => {
    if (libraryImages.length === 0 || selectedLayoutIds.length === 0) {
        setIsRandomDesignPickerOpen(false);
        return;
    }

    const imagesToPlace = [...libraryImages];
    let imageIndex = 0;

    const tempSpreads = spreads.map(spread => {
      const randomLayoutId = selectedLayoutIds[Math.floor(Math.random() * selectedLayoutIds.length)];
      return {
        ...spread,
        layoutId: randomLayoutId,
        images: {}, // Clear existing images
        texts: [],
        stickers: [],
      };
    });

    const finalSpreads = tempSpreads.map(spread => {
      const layout = layouts[spread.layoutId];
      const newImages: { [slotId: string]: PlacedImageData } = {};
      for (const slot of layout.slots) {
        if (imageIndex < imagesToPlace.length) {
          const image = imagesToPlace[imageIndex];
          newImages[slot.id] = {
            image: image,
            transform: { x: 50, y: 50, scale: 1, rotation: 0, flipHorizontal: false, flipVertical: false },
          };
          imageIndex++;
        }
      }
      return { ...spread, images: newImages };
    });

    const usageCounts = new Map<string, number>();
    finalSpreads.forEach(spread => {
      Object.values(spread.images).forEach((placedImage: PlacedImageData) => {
        usageCounts.set(placedImage.image.id, (usageCounts.get(placedImage.image.id) || 0) + 1);
      });
    });

    const newLibraryImages = libraryImages.map(img => ({
      ...img,
      used: usageCounts.get(img.id) || 0,
    }));

    setSpreads(finalSpreads);
    setLibraryImages(newLibraryImages);
    setIsRandomDesignPickerOpen(false);
  };

  const handleRemoveImageFromLibrary = (imageIdToRemove: string) => {
    // Remove from library
    const newLibraryImages = libraryImages.filter(img => img.id !== imageIdToRemove);
    
    // Remove from spreads
    const newSpreads = spreads.map(spread => {
        const newImages = { ...spread.images };
        let imageWasRemoved = false;
        Object.entries(newImages).forEach(([slotId, placedImage]: [string, PlacedImageData]) => {
            if (placedImage.image.id === imageIdToRemove) {
                delete newImages[slotId];
                imageWasRemoved = true;
            }
        });
        return imageWasRemoved ? { ...spread, images: newImages } : spread;
    });

    setLibraryImages(newLibraryImages);
    setSpreads(newSpreads);
  };

  const handleClearLibrary = () => {
    setLibraryImages([]);
    const clearedSpreads = spreads.map(spread => ({
        ...spread,
        images: {},
        texts: [],
        stickers: [],
    }));
    setSpreads(clearedSpreads);
  };

  const handleSelectInitialAlbumSize = (size: AlbumSize) => {
    setAlbumSize(size);
    setIsAlbumSizeChosen(true);
  };

  const handleOpenSubmissionModal = () => {
    setSelectedTextId(null);
    setSelectedStickerId(null);
    setIsSubmissionModalOpen(true);
  };

  const handleToggleOverviewMode = () => {
    setIsOverviewMode(prev => !prev);
    setSelectedTextId(null);
    setSelectedStickerId(null);
  };

  // Text Handlers
  const handleOpenTextPicker = (spreadId: string) => {
    setTextPickerTargetSpreadId(spreadId);
    setIsTextPickerOpen(true);
  };

  const handleAddTextFromTemplate = (template: { style: TextStyle; defaultContent?: string }) => {
    if (!textPickerTargetSpreadId) return;
    
    const finalStyle = { ...template.style };
    if (isMobile && finalStyle.fontSize > 28) {
      finalStyle.fontSize = 28;
    }

    const newText: TextElement = {
      id: `text-${Date.now()}`,
      content: template.defaultContent || 'Your Text Here',
      x: 25,
      y: 45,
      width: 50, // percentage
      height: 15, // percentage
      style: finalStyle,
    };
    setSpreads(currentSpreads =>
      currentSpreads.map(spread =>
        spread.id === textPickerTargetSpreadId ? { ...spread, texts: [...spread.texts, newText] } : spread
      )
    );
    handleSelectText(newText.id);
    setIsTextPickerOpen(false);
    setTextPickerTargetSpreadId(null);
  };

  const handleUpdateText = (spreadId: string, textId: string, newTextData: Partial<TextElement>) => {
    setSpreads(currentSpreads =>
      currentSpreads.map(spread => {
        if (spread.id === spreadId) {
          return {
            ...spread,
            texts: spread.texts.map(text =>
              text.id === textId ? { ...text, ...newTextData } : text
            ),
          };
        }
        return spread;
      })
    );
  };
  
  const handleRemoveText = (spreadId: string, textId: string) => {
    setSpreads(currentSpreads =>
        currentSpreads.map(spread =>
            spread.id === spreadId
                ? { ...spread, texts: spread.texts.filter(text => text.id !== textId) }
                : spread
        )
    );
  };

  // Sticker Handlers
  const handleOpenStickerPicker = (spreadId: string) => {
    setStickerPickerTargetSpreadId(spreadId);
    setIsStickerPickerOpen(true);
  };

  const handleAddSticker = (stickerUrl: string) => {
    if (!stickerPickerTargetSpreadId) return;

    const newSticker: StickerElement = {
      id: `sticker-${Date.now()}`,
      url: stickerUrl,
      x: 35,
      y: 35,
      width: 15, // percentage
      height: 30, // percentage, to maintain a 1:1 visual ratio on a 2:1 spread
      rotation: 0,
    };
    setSpreads(currentSpreads =>
      currentSpreads.map(spread =>
        spread.id === stickerPickerTargetSpreadId ? { ...spread, stickers: [...spread.stickers, newSticker] } : spread
      )
    );
    handleSelectSticker(newSticker.id);
    setIsStickerPickerOpen(false);
    setStickerPickerTargetSpreadId(null);
  };

  const handleUpdateSticker = (spreadId: string, stickerId: string, newStickerData: Partial<StickerElement>) => {
    setSpreads(currentSpreads =>
      currentSpreads.map(spread => {
        if (spread.id === spreadId) {
          return {
            ...spread,
            stickers: spread.stickers.map(sticker =>
              sticker.id === stickerId ? { ...sticker, ...newStickerData } : sticker
            ),
          };
        }
        return spread;
      })
    );
  };

  const handleRemoveSticker = (spreadId: string, stickerId: string) => {
    setSpreads(currentSpreads =>
      currentSpreads.map(spread =>
        spread.id === spreadId
          ? { ...spread, stickers: spread.stickers.filter(sticker => sticker.id !== stickerId) }
          : spread
      )
    );
  };

  const handleTriggerAddOverlayImage = (spreadId: string) => {
    setAddOverlayTargetSpreadId(spreadId);
    addOverlayImageFileInputRef.current?.click();
  };

  const handleAddOverlayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !addOverlayTargetSpreadId) {
      return;
    }
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    const newOverlay: StickerElement = {
      id: `overlay-${Date.now()}`,
      url: imageUrl,
      x: 25,
      y: 25,
      width: 30, // percentage
      height: 60, // percentage, to maintain aspect on a 2:1 spread
      rotation: 0,
    };

    setSpreads(currentSpreads =>
      currentSpreads.map(spread =>
        spread.id === addOverlayTargetSpreadId
          ? { ...spread, stickers: [...spread.stickers, newOverlay] }
          : spread
      )
    );
    handleSelectSticker(newOverlay.id);

    setAddOverlayTargetSpreadId(null);
    if (e.target) e.target.value = '';
  };

  // Project Management Handlers
  const handleSaveProject = async (projectName: string) => {
    if (!albumSize) {
      alert("Cannot save project without an album size.");
      return false;
    }
    try {
      // 1. Save each image's blob data to IndexedDB
      for (const image of libraryImages) {
        if (image.url.startsWith('blob:')) {
          const response = await fetch(image.url);
          const blob = await response.blob();
          await saveImageToDB(image.id, blob);
        }
      }
      
      // 2. Create "clean" data for the main project file (without blob URLs)
      const cleanedLibraryImages: SavedAlbumImage[] = libraryImages.map(({ url, ...rest }) => rest);
      
      const cleanedSpreads: SavedSpreadData[] = spreads.map(spread => ({
        ...spread,
        images: Object.fromEntries(
          // FIX: Explicitly typed the arguments of the map callback to resolve a TypeScript inference issue
          // where `placedImage` was being inferred as `unknown`, causing property access and spread operator errors.
          Object.entries(spread.images).map(([slotId, placedImage]: [string, PlacedImageData]) => {
            const { url, ...restOfImage } = placedImage.image;
            const savedPlacedImage: SavedPlacedImageData = {
                ...placedImage,
                image: restOfImage
            };
            return [slotId, savedPlacedImage];
          })
        )
      }));

      const projectData: SavedProjectData = {
        spreads: cleanedSpreads,
        libraryImages: cleanedLibraryImages,
        albumSize,
      };

      // 3. Save the main project manifest to localStorage
      localStorage.setItem(`photobook_project_${projectName}`, JSON.stringify(projectData));
      setCurrentProjectName(projectName); // Set the current project name on successful save
      return true;

    } catch (error) {
      console.error("Failed to save project:", error);
      alert("An unexpected error occurred while saving the project. Your browser's storage might be full or IndexedDB is not supported.");
      
      // Clean up any partially saved image data on failure
      for (const img of libraryImages) {
        await deleteImageFromDB(img.id).catch(e => console.error(`Cleanup failed for image ${img.id}`, e));
      }
      return false;
    }
  };

  const handleLoadProject = async (projectName: string) => {
    const savedData = localStorage.getItem(`photobook_project_${projectName}`);
    if (savedData) {
      try {
        const projectData = JSON.parse(savedData) as SavedProjectData;
        
        // Revoke old object URLs to prevent memory leaks
        libraryImages.forEach(img => {
            if(img.url.startsWith('blob:')) {
                URL.revokeObjectURL(img.url);
            }
        });

        // 1. Reconstruct library images with new blob URLs from IndexedDB
        const newLibraryImagesPromises = projectData.libraryImages.map(async (img: SavedAlbumImage) => {
          const blob = await getImageFromDB(img.id);
          if (blob) {
            return { ...img, url: URL.createObjectURL(blob) };
          }
          console.warn(`Missing image data for ID: ${img.id}`);
          return null; // Handle missing image data gracefully
        });

        const newLibraryImages = (await Promise.all(newLibraryImagesPromises))
            .filter((img): img is AlbumImage => img !== null); // Filter out any nulls
        
        const imageMap = new Map(newLibraryImages.map(img => [img.id, img]));

        // 2. Reconstruct spreads with updated image objects from the map.
        const newSpreads: SpreadData[] = projectData.spreads.map((spread: SavedSpreadData) => {
          // FIX: Replaced the loop to iterate over spread images using `Object.keys`. This avoids a
          // TypeScript inference issue where the value from `Object.entries` was incorrectly inferred
          // as `unknown`, causing property access to fail.
          const reconstructedImages: { [key: string]: PlacedImageData } = {};
          for (const slotId of Object.keys(spread.images)) {
            const savedPlacedImage = spread.images[slotId];
            const fullImageObject = imageMap.get(savedPlacedImage.image.id);
            if (fullImageObject) {
              reconstructedImages[slotId] = {
                ...savedPlacedImage,
                image: fullImageObject,
              };
            }
          }

          return {
            ...spread,
            images: reconstructedImages,
          };
        });

        setLibraryImages(newLibraryImages);
        setSpreads(newSpreads);
        setAlbumSize(projectData.albumSize);
        setCurrentProjectName(projectName); // Set the current project name on successful load
        setIsProjectManagerOpen(false);
        setIsAlbumSizeChosen(true); // Show the main app

      } catch (error) {
          console.error("Failed to load project:", error);
          alert("Failed to load project. The project file might be corrupted or image data is missing.");
      }
    }
  };

  const handleDeleteProject = async (projectName: string) => {
    const savedData = localStorage.getItem(`photobook_project_${projectName}`);
    if (savedData) {
      try {
        const projectData = JSON.parse(savedData) as SavedProjectData;
        // Delete associated images from IndexedDB
        if (projectData.libraryImages && Array.isArray(projectData.libraryImages)) {
          for (const img of projectData.libraryImages) {
            await deleteImageFromDB(img.id).catch(e => console.error(`Failed to delete image ${img.id} from DB`, e));
          }
        }
      } catch (e) {
        console.error(`Could not parse project ${projectName} for deletion, image files may be orphaned.`);
      }
    }
    // Delete the main project file from localStorage
    localStorage.removeItem(`photobook_project_${projectName}`);

    // If deleting the current project, clear the current project name
    if (currentProjectName === projectName) {
      setCurrentProjectName(null);
    }
  };

  const handleNewProject = () => {
    // Revoke any existing blob URLs to prevent memory leaks
    libraryImages.forEach(img => {
      if(img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
      }
    });
    setLibraryImages(initialLibraryImages);
    setSpreads(initialSpreadsData);
    setCurrentProjectName(null); // Clear current project name
    setIsProjectManagerOpen(false);
    // Also reset other states
    setIsOverviewMode(false);
    setSelectedTextId(null);
    setSelectedStickerId(null);
    // Go back to welcome screen
    setAlbumSize(null);
    setIsAlbumSizeChosen(false);
  };
  
  const handleAiRetouchImage = (
    originalImageId: string,
    slotId: string,
    spreadId: string,
    newImageBase64: string,
    mimeType: string
  ) => {
    // 1. Convert base64 to Blob
    const byteCharacters = atob(newImageBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const newImageUrl = URL.createObjectURL(blob);

    // 2. Create new AlbumImage
    const newImage: AlbumImage = {
        id: `ai-img-${Date.now()}`,
        url: newImageUrl,
        used: 1,
        linked: false,
    };

    // 3. Add to library and update old image usage
    setLibraryImages(prev => {
        const updatedImages = prev.map(img => {
            if (img.id === originalImageId) {
                return { ...img, used: Math.max(0, (img.used || 0) - 1) };
            }
            return img;
        });
        const originalIndex = updatedImages.findIndex(img => img.id === originalImageId);
        if (originalIndex !== -1) {
            updatedImages.splice(originalIndex + 1, 0, newImage);
        } else {
            updatedImages.unshift(newImage); // Fallback to add at start
        }
        return updatedImages;
    });

    // 4. Update spread
    setSpreads(prev => prev.map(spread => {
        if (spread.id === spreadId) {
            const newImages = { ...spread.images };
            const oldPlacedImage = newImages[slotId];
            if (oldPlacedImage && oldPlacedImage.image.id === originalImageId) {
                newImages[slotId] = {
                    ...oldPlacedImage, // Keep transform
                    image: newImage
                };
            }
            return { ...spread, images: newImages };
        }
        return spread;
    }));
  };

    // --- Touch Drag & Drop Handlers ---
  const handleImageTouchStart = (image: AlbumImage, startEvent: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (startEvent.cancelable) startEvent.preventDefault();
    
    const touch = startEvent.touches[0];
    const targetRect = (startEvent.currentTarget as HTMLElement).getBoundingClientRect();
    
    setTouchDragItem({
        image,
        x: touch.clientX,
        y: touch.clientY,
        width: Math.min(targetRect.width, 100),
        height: Math.min(targetRect.height, 100),
    });
  };

  useEffect(() => {
    if (!touchDragItem) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];

      setTouchDragItem(prev => (prev ? { ...prev, x: touch.clientX, y: touch.clientY } : null));

      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      if (dropTarget) {
        const slotElement = dropTarget.closest('[data-slot-id]');
        const spreadElement = dropTarget.closest('[data-spread-id]');
        if (slotElement && spreadElement) {
          const slotId = slotElement.getAttribute('data-slot-id');
          const spreadId = spreadElement.getAttribute('data-spread-id');
          if (slotId && spreadId) {
            if (touchDragOverSlot?.spreadId !== spreadId || touchDragOverSlot?.slotId !== slotId) {
              setTouchDragOverSlot({ spreadId, slotId });
            }
            return;
          }
        }
      }
      if (touchDragOverSlot !== null) {
        setTouchDragOverSlot(null);
      }
    };

    const handleTouchEnd = () => {
      if (touchDragItem && touchDragOverSlot) {
        handleDropImageInSlot(touchDragItem.image.id, touchDragOverSlot.spreadId, touchDragOverSlot.slotId);
      }
      setTouchDragItem(null);
      setTouchDragOverSlot(null);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [touchDragItem, touchDragOverSlot, handleDropImageInSlot]);
  
  // Effect to hide original element during touch drag
  useEffect(() => {
    const originalElementId = touchDragItem ? `lib-img-thumb-${touchDragItem.image.id}` : null;
    if (originalElementId) {
        const element = document.getElementById(originalElementId);
        if (element) element.style.visibility = 'hidden';
    }
    return () => {
        if (originalElementId) {
            const element = document.getElementById(originalElementId);
            if (element) element.style.visibility = 'visible';
        }
    };
  }, [touchDragItem]);

  // --- RENDER ADMIN OR MAIN APP ---
  if (isAdminRoute) {
    return <AdminPage />;
  }
  // --------------------------------

  if (!isAlbumSizeChosen || !albumSize) {
    return (
      <div className="bg-gray-200 h-full">
          <WelcomeScreen
            isMobile={isMobile}
            onSelectSize={handleSelectInitialAlbumSize} 
            onOpenProjectManager={() => setIsProjectManagerOpen(true)}
          />
          {isProjectManagerOpen && (
            <ProjectManager
              currentProjectName={currentProjectName}
              onSave={handleSaveProject}
              onLoad={handleLoadProject}
              onDelete={handleDeleteProject}
              onNewProject={handleNewProject}
              onClose={() => setIsProjectManagerOpen(false)}
            />
          )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-sans bg-gray-200 text-gray-800">
      {/* Modals and Overlays */}
      <input type="file" accept="image/*" ref={addOverlayImageFileInputRef} onChange={handleAddOverlayImage} className="hidden" />
      
      {isClientKeyModalOpen && (
        <ClientKeyInput 
          onSave={handleSaveClientKey} 
          onClose={() => setIsClientKeyModalOpen(false)} 
        />
      )}

      {touchDragItem && (
        <div
            style={{
            position: 'fixed',
            top: touchDragItem.y - touchDragItem.height / 2,
            left: touchDragItem.x - touchDragItem.width / 2,
            width: `${touchDragItem.width}px`,
            height: `${touchDragItem.height}px`,
            zIndex: 1000,
            pointerEvents: 'none',
            opacity: 0.8,
            }}
        >
            <img src={touchDragItem.image.url} alt="drag-preview" className="w-full h-full object-cover rounded-md shadow-lg" />
        </div>
       )}

      {showMobileDragHint && (
        <MobileDragHint libraryHeight={libraryHeight} onClose={() => setShowMobileDragHint(false)} />
      )}
      {showMobileEditHint && editHintTarget && (
        <MobileEditHint 
            targetSpreadId={editHintTarget.spreadId}
            targetSlotId={editHintTarget.slotId}
            onClose={() => {
                setShowMobileEditHint(false);
                setEditHintTarget(null);
            }} 
        />
      )}
      {isAutoDesignPickerOpen && (
        <AutoDesignLayoutPicker
          isMobile={isMobile}
          onSelectLayout={handleAutoDesign}
          onClose={() => setIsAutoDesignPickerOpen(false)}
        />
      )}
      {isRandomDesignPickerOpen && (
        <RandomDesignLayoutPicker
          isMobile={isMobile}
          onConfirm={handleConfirmRandomDesign}
          onClose={() => setIsRandomDesignPickerOpen(false)}
        />
      )}
      {isMobileDesignPickerOpen && (
        <MobileDesignPicker
          onClose={() => setIsMobileDesignPickerOpen(false)}
          onAutoDesign={() => {
            setIsMobileDesignPickerOpen(false);
            handleDesignForMe();
          }}
          onRandomDesign={() => {
            setIsMobileDesignPickerOpen(false);
            handleDesignRandom();
          }}
        />
      )}
      {isTextPickerOpen && (
        <TextTemplatePicker
          onSelectTemplate={handleAddTextFromTemplate}
          onClose={() => {
            setIsTextPickerOpen(false);
            setTextPickerTargetSpreadId(null);
          }}
        />
      )}
      {isStickerPickerOpen && (
        <StickerPicker
          onSelectSticker={handleAddSticker}
          onClose={() => {
            setIsStickerPickerOpen(false);
            setStickerPickerTargetSpreadId(null);
          }}
        />
      )}
      {isProjectManagerOpen && (
        <ProjectManager
          currentProjectName={currentProjectName}
          onSave={handleSaveProject}
          onLoad={handleLoadProject}
          onDelete={handleDeleteProject}
          onNewProject={handleNewProject}
          onClose={() => setIsProjectManagerOpen(false)}
        />
      )}
       {isSubmissionModalOpen && (
        <SubmissionModal
          projectName={currentProjectName}
          albumSize={albumSize}
          spreads={spreads}
          libraryImages={libraryImages}
          onClose={() => setIsSubmissionModalOpen(false)}
          onSaveProject={handleSaveProject}
        />
      )}
      
      {/* Main Layout */}
      <Header 
        totalPages={spreads.length * 2} 
        onSubmitProject={handleOpenSubmissionModal}
        isOverviewMode={isOverviewMode}
        onToggleOverview={handleToggleOverviewMode}
        onDesignForMe={handleDesignForMe}
        onDesignRandom={handleDesignRandom}
        isDesignDisabled={libraryImages.length === 0}
        onOpenProjectManager={() => setIsProjectManagerOpen(true)}
        isMobile={isMobile}
        onOpenMobileDesignPicker={() => setIsMobileDesignPickerOpen(true)}
        aiResolution={aiResolution}
        setAiResolution={setAiResolution}
      />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div 
          style={isMobile ? { height: `${libraryHeight}px` } : { width: `${libraryWidth}px` }} 
          className="order-3 md:order-1 flex-shrink-0 md:h-full flex flex-col bg-gray-100/80 backdrop-blur-sm border-t md:border-t-0 md:border-r border-gray-300"
        >
          <ImageLibrary 
            images={libraryImages}
            totalImages={libraryImages.length}
            onAddImages={handleAddImages}
            onReorder={handleReorderLibrary}
            onRemoveImage={handleRemoveImageFromLibrary}
            onClearLibrary={handleClearLibrary}
            isMobile={isMobile}
            onImageTouchStart={handleImageTouchStart}
          />
        </div>
        <div 
          onMouseDown={handleResizeMouseDown}
          className="order-2 md:order-2 w-full h-1.5 md:w-1.5 md:h-full flex-shrink-0 cursor-row-resize md:cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors"
        />
        <main className="order-1 md:order-3 flex-1 overflow-y-auto">
          <AlbumView 
              spreads={spreads} 
              albumSize={albumSize}
              isMobile={isMobile}
              isOverviewMode={isOverviewMode}
              selectedTextId={selectedTextId}
              selectedStickerId={selectedStickerId}
              touchDragOverSlot={touchDragOverSlot}
              onDropImageInSlot={handleDropImageInSlot} 
              onSwapImagesInSlots={handleSwapImagesInSlots}
              onChangeLayout={handleChangeLayout}
              onUpdateImageTransform={handleUpdateImageTransform}
              onRemoveImageFromSlot={handleRemoveImageFromSlot}
              onAddSpread={handleAddSpread}
              onReorderSpreads={handleReorderSpreads}
              onOpenTextPicker={handleOpenTextPicker}
              onUpdateText={handleUpdateText}
              onRemoveText={handleRemoveText}
              onSelectText={handleSelectText}
              onOpenStickerPicker={handleOpenStickerPicker}
              onUpdateSticker={handleUpdateSticker}
              onRemoveSticker={handleRemoveSticker}
              onSelectSticker={handleSelectSticker}
              onAiRetouchImage={handleAiRetouchImage}
              onTriggerAddOverlayImage={handleTriggerAddOverlayImage}
              aiResolution={aiResolution}
              clientKey={clientKey}
              onRequireClientKey={() => setIsClientKeyModalOpen(true)}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
