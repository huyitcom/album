import React from 'react';
import { TextElement, TextStyle } from '../types';
import { BoldIcon, ItalicIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from './icons';

interface TextToolbarProps {
  textElement: TextElement;
  onUpdateStyle: (newStyle: Partial<TextStyle>) => void;
}

const TextToolbar: React.FC<TextToolbarProps> = ({ textElement, onUpdateStyle }) => {
  const { style } = textElement;
  
  const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Georgia', 'Courier New', 'Roboto', 'Playfair Display', 'Sacramento', 'Lobster', 'Pacifico', 'Bungee Spice', 'Press Start 2P', 'Anton'];
  const fontSizes = [12, 14, 16, 18, 24, 28, 32, 36, 42, 48, 56, 64, 72];

  return (
    <div 
        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-800 text-white rounded-md shadow-lg p-1 flex items-center flex-wrap justify-center gap-1 z-30 w-max max-w-xs md:max-w-none"
        data-text-toolbar="true"
        onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Font Family */}
      <select 
        value={style.fontFamily} 
        onChange={(e) => onUpdateStyle({ fontFamily: e.target.value })}
        className="bg-gray-700 text-xs rounded px-1 py-0.5"
      >
        {fonts.map(font => <option key={font} value={font}>{font}</option>)}
      </select>

      {/* Font Size */}
      <select 
        value={style.fontSize}
        onChange={(e) => onUpdateStyle({ fontSize: parseInt(e.target.value, 10) })}
        className="bg-gray-700 text-xs rounded px-1 py-0.5"
      >
        {fontSizes.map(size => <option key={size} value={size}>{size} pt</option>)}
      </select>

      {/* Color */}
      <input 
        type="color"
        value={style.color}
        onChange={(e) => onUpdateStyle({ color: e.target.value })}
        className="w-6 h-6 p-0.5 bg-gray-700 border-none rounded"
      />

      <div className="h-5 border-l border-gray-600"></div>

      {/* Style Toggles */}
      <button onClick={() => onUpdateStyle({ bold: !style.bold })} className={`p-1 rounded ${style.bold ? 'bg-blue-500' : 'hover:bg-gray-700'}`}><BoldIcon className="w-4 h-4" /></button>
      <button onClick={() => onUpdateStyle({ italic: !style.italic })} className={`p-1 rounded ${style.italic ? 'bg-blue-500' : 'hover:bg-gray-700'}`}><ItalicIcon className="w-4 h-4" /></button>
      
      <div className="h-5 border-l border-gray-600"></div>

      {/* Alignment */}
      <button onClick={() => onUpdateStyle({ align: 'left' })} className={`p-1 rounded ${style.align === 'left' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}><AlignLeftIcon className="w-4 h-4" /></button>
      <button onClick={() => onUpdateStyle({ align: 'center' })} className={`p-1 rounded ${style.align === 'center' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}><AlignCenterIcon className="w-4 h-4" /></button>
      <button onClick={() => onUpdateStyle({ align: 'right' })} className={`p-1 rounded ${style.align === 'right' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}><AlignRightIcon className="w-4 h-4" /></button>
    </div>
  );
};

export default TextToolbar;