
import React, { useState, useRef, useEffect } from 'react';
import { TextElement as TextElementType } from '../types';
import { XMarkIcon } from './icons';
import TextToolbar from './TextToolbar';
import { useI18n } from './i18n';

interface TextElementProps {
  spreadId: string;
  data: TextElementType;
  isSelected: boolean;
  isOverviewMode: boolean;
  onSelect: (textId: string | null) => void;
  onUpdate: (spreadId: string, textId: string, newTextData: Partial<TextElementType>) => void;
  onRemove: (spreadId: string, textId: string) => void;
}

const TextElement: React.FC<TextElementProps> = ({ spreadId, data, isSelected, isOverviewMode, onSelect, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const { t } = useI18n();

  const elementRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, elX: 0, elY: 0, elW: 0, elH: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) return;
    e.stopPropagation();
    onSelect(data.id);
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, elX: data.x, elY: data.y, elW: data.width, elH: data.height };
  };
  
  const handleResizeHandleMouseDown = (e: React.MouseEvent<HTMLDivElement>, handle: string) => {
    e.stopPropagation();
    onSelect(data.id);
    setIsResizing(handle);
    dragStartRef.current = { x: e.clientX, y: e.clientY, elX: data.x, elY: data.y, elW: data.width, elH: data.height };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      const parentRect = elementRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect || parentRect.width === 0 || parentRect.height === 0) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      if (isDragging) {
        const newX = dragStartRef.current.elX + (dx / parentRect.width) * 100;
        const newY = dragStartRef.current.elY + (dy / parentRect.height) * 100;
        onUpdate(spreadId, data.id, { x: newX, y: newY });
      } else if (isResizing) {
          const dw = (dx / parentRect.width) * 100;
          const dh = (dy / parentRect.height) * 100;
          
          let newWidth = dragStartRef.current.elW;
          let newHeight = dragStartRef.current.elH;
          let newX = dragStartRef.current.elX;
          let newY = dragStartRef.current.elY;

          if (isResizing.includes('right')) newWidth += dw;
          if (isResizing.includes('left')) {
            newWidth -= dw;
            newX += dw;
          }
          if (isResizing.includes('bottom')) newHeight += dh;
          if (isResizing.includes('top')) {
            newHeight -= dh;
            newY += dh;
          }
        
          onUpdate(spreadId, data.id, { width: Math.max(5, newWidth), height: Math.max(5, newHeight), x: newX, y: newY });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, onUpdate, spreadId, data.id]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(spreadId, data.id, { content: e.target.value });
  };
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(data.id);
    setIsEditing(true);
  }

  const resizeHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  
  const OVERVIEW_SCALE_FACTOR = 3.2;
  const finalFontSize = isOverviewMode ? data.style.fontSize / OVERVIEW_SCALE_FACTOR : data.style.fontSize;

  const baseStyles: React.CSSProperties = {
    fontFamily: data.style.fontFamily,
    fontSize: `${finalFontSize}px`,
    fontWeight: data.style.bold ? 'bold' : 'normal',
    fontStyle: data.style.italic ? 'italic' : 'normal',
    textAlign: data.style.align,
    textShadow: data.style.textShadow,
    letterSpacing: data.style.letterSpacing,
    textTransform: data.style.textTransform as 'none' | 'uppercase' | 'lowercase' | 'capitalize' | undefined,
  };
  
  const viewStyles: React.CSSProperties = { ...baseStyles, color: data.style.color };
  if (data.style.background) {
    viewStyles.background = data.style.background;
    viewStyles.WebkitBackgroundClip = 'text';
    viewStyles.backgroundClip = 'text';
    viewStyles.color = 'transparent';
  }

  const editStyles: React.CSSProperties = { ...baseStyles, color: data.style.color };


  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move pointer-events-auto ${isSelected && !isOverviewMode ? 'border-2 border-blue-500' : 'border border-transparent hover:border-blue-300/50'}`}
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: `${data.width}%`,
        height: `${data.height}%`,
        zIndex: isSelected ? 20 : 10,
      }}
      onMouseDown={isOverviewMode ? undefined : handleMouseDown}
      onDoubleClick={isOverviewMode ? undefined : handleDoubleClick}
      data-text-element="true"
    >
      {isSelected && !isOverviewMode && <TextToolbar textElement={data} onUpdateStyle={(newStyle) => onUpdate(spreadId, data.id, { style: {...data.style, ...newStyle }})} />}
      
      {isEditing && !isOverviewMode ? (
        <textarea
          value={data.content}
          onChange={handleContentChange}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="w-full h-full bg-transparent outline-none resize-none"
          style={editStyles}
          onMouseDown={(e) => e.stopPropagation()}
        />
      ) : (
        <div 
            className="w-full h-full overflow-hidden whitespace-pre-wrap flex items-center"
             style={{ justifyContent: data.style.align === 'left' ? 'flex-start' : data.style.align === 'right' ? 'flex-end' : 'center', alignItems: 'center' }}
        >
          <div style={viewStyles}>
            {data.content}
          </div>
        </div>
      )}

      {isSelected && !isEditing && !isOverviewMode && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(spreadId, data.id); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow z-30"
            title={t('removeTextTitle')}
          >
            <XMarkIcon className="w-3 h-3"/>
          </button>
          {resizeHandles.map(handle => (
              <div 
                key={handle}
                className={`absolute w-3 h-3 bg-white border border-gray-500 rounded-full z-30 ${handle.includes('left') ? '-left-1.5' : '-right-1.5'} ${handle.includes('top') ? '-top-1.5' : '-bottom-1.5'} 
                ${(handle === 'top-left' || handle === 'bottom-right') ? 'cursor-nwse-resize' : 'cursor-nesw-resize'}`}
                onMouseDown={(e) => handleResizeHandleMouseDown(e, handle)}
              />
          ))}
        </>
      )}
    </div>
  );
};

export default TextElement;