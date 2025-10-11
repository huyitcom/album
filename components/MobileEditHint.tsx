import React, { useEffect, useState } from 'react';
import { useI18n } from './i18n';

interface MobileEditHintProps {
  targetSpreadId: string;
  targetSlotId: string;
  onClose: () => void;
}

const MobileEditHint: React.FC<MobileEditHintProps> = ({ targetSpreadId, targetSlotId, onClose }) => {
  const { t } = useI18n();
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    const targetElement = document.querySelector<HTMLElement>(`[data-spread-id="${targetSpreadId}"] [data-slot-id="${targetSlotId}"]`);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      // Position the hint above the specific slot
      setPosition({
        top: rect.top - 60, // 60px above the slot
        left: rect.left + rect.width / 2, // Centered horizontally on the slot
        width: Math.min(rect.width * 0.9, 250), // Responsive width
      });
    }

    return () => clearTimeout(timer);
  }, [onClose, targetSpreadId, targetSlotId]);

  if (!position) {
    return null;
  }

  return (
    <div 
      className="fixed bg-yellow-400 text-black p-3 rounded-lg shadow-lg z-50 animate-fade-in-up"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        transform: 'translateX(-50%)',
        visibility: position ? 'visible' : 'hidden',
      }}
      onClick={onClose}
    >
      <p className="text-center text-sm font-semibold">{t('doubleTapToEdit')}</p>
      {/* Arrow pointing down */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-yellow-400"></div>
    </div>
  );
};

export default MobileEditHint;