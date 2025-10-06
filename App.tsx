
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import AlbumView from './components/AlbumView';
import ImageLibrary from './components/ImageLibrary';
import AutoDesignLayoutPicker from './components/AutoDesignLayoutPicker';
import AlbumSizePicker from './components/AlbumSizePicker';
import TextTemplatePicker from './components/TextTemplatePicker';
import StickerPicker from './components/StickerPicker';
import { spreadsData as initialSpreadsData, libraryImages as initialLibraryImages } from './constants';
import { layouts } from './layouts';
import { AlbumImage, SpreadData, ImageTransform, PlacedImageData, AlbumSize, TextElement, TextStyle, StickerElement } from './types';

// Add type declaration for html2canvas
declare const html2canvas: any;

const App: React.FC = () => {
  const [libraryImages, setLibraryImages] = useState<AlbumImage[]>(initialLibraryImages);
  const [spreads, setSpreads] = useState<SpreadData[]>(initialSpreadsData);
  const [isAutoDesignPickerOpen, setIsAutoDesignPickerOpen] = useState(false);
  const [albumSize, setAlbumSize] = useState<AlbumSize>('30x30');
  const [isAlbumSizePickerOpen, setIsAlbumSizePickerOpen] = useState(false);
  const [isOverviewMode, setIsOverviewMode] = useState(false);
  const [libraryWidth, setLibraryWidth] = useState(288); // 18rem
  
  // Element Selection State
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Picker Modals State
  const [isTextPickerOpen, setIsTextPickerOpen] = useState(false);
  const [textPickerTargetSpreadId, setTextPickerTargetSpreadId] = useState<string | null>(null);
  const [isStickerPickerOpen, setIsStickerPickerOpen] = useState(false);
  const [stickerPickerTargetSpreadId, setStickerPickerTargetSpreadId] = useState<string | null>(null);


  const handleAppClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Deselect all elements if clicking outside an interactive element
    if (!target.closest('[data-text-element="true"]') && !target.closest('[data-text-toolbar="true"]') && !target.closest('[data-sticker-element="true"]')) {
      setSelectedTextId(null);
      setSelectedStickerId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleAppClick);
    return () => {
      document.removeEventListener('click', handleAppClick);
    };
  }, []);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
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
        // FIX: Explicitly type 'placed' as PlacedImageData to resolve TypeScript inference issue.
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

  const handleDropImageInSlot = (imageId: string, spreadId: string, slotId: string) => {
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
  };

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
        id: `spread${currentSpreads.length + 1}`,
        pages: [newPageStart, newPageStart + 1],
        layoutId: 'two-equal-vertical-split', // Default layout for new spreads
        images: {},
        texts: [],
        stickers: [],
      };
      return [...currentSpreads, newSpread];
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
        // FIX: Explicitly type 'placedImage' as PlacedImageData to resolve type inference issue and remove redundant check.
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

    const layoutIds = Object.keys(layouts);
    const imagesToPlace = [...libraryImages];
    let imageIndex = 0;

    const tempSpreads = spreads.map(spread => {
      const randomLayoutId = layoutIds[Math.floor(Math.random() * layoutIds.length)];
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
      // FIX: Explicitly type 'placedImage' as PlacedImageData to resolve type inference issue and remove redundant check.
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
  };

  const handleRemoveImageFromLibrary = (imageIdToRemove: string) => {
    // Remove from library
    const newLibraryImages = libraryImages.filter(img => img.id !== imageIdToRemove);
    
    // Remove from spreads
    const newSpreads = spreads.map(spread => {
        const newImages = { ...spread.images };
        let imageWasRemoved = false;
        // FIX: Explicitly type 'placedImage' as PlacedImageData to resolve type inference issue and remove redundant check.
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

  const handleChangeAlbumSize = (newSize: AlbumSize) => {
    setAlbumSize(newSize);
    setIsAlbumSizePickerOpen(false);
  };

  const handleDownloadAlbum = async () => {
    setSelectedTextId(null); // Deselect any text box
    setSelectedStickerId(null); // Deselect any sticker
    await new Promise(resolve => setTimeout(resolve, 100)); // allow UI to update

    // --- Prepare elements for capture ---

    // 1. Hide UI elements meant only for editing
    const elementsToHide = document.querySelectorAll('[data-hide-on-capture="true"]');
    const originalDisplays = new Map<HTMLElement, string>();
    elementsToHide.forEach(el => {
        const htmlEl = el as HTMLElement;
        originalDisplays.set(htmlEl, htmlEl.style.display);
        htmlEl.style.display = 'none';
    });
    
    // 2. Make element layers (text, stickers) visible to html2canvas
    const elementLayers = document.querySelectorAll('[data-elements-layer="true"]');
    elementLayers.forEach(el => (el as HTMLElement).classList.remove('pointer-events-none'));


    // --- Perform Capture ---
    const spreadElements = document.querySelectorAll('[data-spread-id]');
    for (const spreadEl of Array.from(spreadElements)) {
      const spreadId = spreadEl.getAttribute('data-spread-id');
      const spreadData = spreads.find(s => s.id === spreadId);
      const captureTarget = spreadEl.querySelector('[data-spread-capture-target="true"]') as HTMLElement;

      if (captureTarget && spreadData && (Object.keys(spreadData.images).length > 0 || spreadData.texts.length > 0 || spreadData.stickers.length > 0)) {
        
        const canvas = await html2canvas(captureTarget, {
          useCORS: true,
          scale: 2 // Higher scale for better quality
        });

        const link = document.createElement('a');
        link.download = `Album-Pages_${spreadData.pages.join('-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }

    // --- Restore elements after capture ---

    // 1. Restore hidden elements
    elementsToHide.forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.display = originalDisplays.get(htmlEl) || '';
    });
    
    // 2. Restore pointer-events on element layers
    elementLayers.forEach(el => (el as HTMLElement).classList.add('pointer-events-none'));
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
    
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      content: template.defaultContent || 'Your Text Here',
      x: 25,
      y: 45,
      width: 25, // percentage
      height: 12, // percentage
      style: template.style,
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


  return (
    <div className="flex flex-col h-screen font-sans bg-gray-200 text-gray-800">
      {isAutoDesignPickerOpen && (
        <AutoDesignLayoutPicker
          onSelectLayout={handleAutoDesign}
          onClose={() => setIsAutoDesignPickerOpen(false)}
        />
      )}
      {isAlbumSizePickerOpen && (
        <AlbumSizePicker
          currentSize={albumSize}
          onSelectSize={handleChangeAlbumSize}
          onClose={() => setIsAlbumSizePickerOpen(false)}
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
      <Header 
        totalPages={spreads.length * 2} 
        albumSize={albumSize}
        onSizeChangeClick={() => setIsAlbumSizePickerOpen(true)}
        onDownload={handleDownloadAlbum}
        isOverviewMode={isOverviewMode}
        onToggleOverview={handleToggleOverviewMode}
        onDesignForMe={handleDesignForMe}
        onDesignRandom={handleDesignRandom}
        isDesignDisabled={libraryImages.length === 0}
      />
      <div className="flex flex-1 overflow-hidden">
        <div 
          style={{ width: `${libraryWidth}px` }} 
          className="flex-shrink-0 h-full flex flex-col bg-gray-100/80 backdrop-blur-sm border-r border-gray-300"
        >
          <ImageLibrary 
            images={libraryImages}
            totalImages={libraryImages.length}
            onAddImages={handleAddImages}
            onReorder={handleReorderLibrary}
            onRemoveImage={handleRemoveImageFromLibrary}
            onClearLibrary={handleClearLibrary}
          />
        </div>
        <div 
          onMouseDown={handleResizeMouseDown}
          className="w-1.5 flex-shrink-0 cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors"
        />
        <main className="flex-1 overflow-y-auto">
          <AlbumView 
              spreads={spreads} 
              albumSize={albumSize}
              isOverviewMode={isOverviewMode}
              selectedTextId={selectedTextId}
              selectedStickerId={selectedStickerId}
              onDropImageInSlot={handleDropImageInSlot} 
              onSwapImagesInSlots={handleSwapImagesInSlots}
              onChangeLayout={handleChangeLayout}
              onUpdateImageTransform={handleUpdateImageTransform}
              onRemoveImageFromSlot={handleRemoveImageFromSlot}
              onAddSpread={handleAddSpread}
              onOpenTextPicker={handleOpenTextPicker}
              onUpdateText={handleUpdateText}
              onRemoveText={handleRemoveText}
              onSelectText={handleSelectText}
              onOpenStickerPicker={handleOpenStickerPicker}
              onUpdateSticker={handleUpdateSticker}
              onRemoveSticker={handleRemoveSticker}
              onSelectSticker={handleSelectSticker}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
