import React, { useEffect } from 'react';
import { useI18n } from './i18n';

interface MobileDragHintProps {
  libraryHeight: number;
  onClose: () => void;
}

const MobileDragHint: React.FC<MobileDragHintProps> = ({ libraryHeight, onClose }) => {
  const { t } = useI18n();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed left-4 right-4 md:hidden bg-yellow-400 text-black p-3 rounded-lg shadow-lg z-50 animate-fade-in-up"
      style={{ bottom: `${libraryHeight + 12}px` }} // Position above the resizer
      onClick={onClose}
    >
      <p className="text-center text-sm font-semibold">{t('mobileDragHint')}</p>
      {/* Arrow pointing down */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-yellow-400"></div>
    </div>
  );
};

export default MobileDragHint;