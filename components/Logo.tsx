import React from 'react';

interface LogoProps {
  forceFull?: boolean;
}

const Logo: React.FC<LogoProps> = ({ forceFull = false }) => {
  return (
    <div className="flex items-center" title="PHOTOBOOKVIETNAM Album Builder">
      {/* Full Logo - only shows when forceFull is true */}
      {forceFull && (
        <span 
          className="inline text-3xl"
          style={{ 
            fontFamily: "'Fjalla One', sans-serif", 
            letterSpacing: '-0.075em',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
          }}
        >
          <span className="text-black">PHOTOBOOK</span><span className="text-cyan-200">VIETNAM</span>
        </span>
      )}
      
      {/* Short/Stacked Logo (shows everywhere by default unless forceFull is true) */}
      {!forceFull && (
        <div 
          className="flex flex-col items-center justify-center leading-none" 
          style={{ 
            fontFamily: "'Fjalla One', sans-serif", 
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
          }}
        >
          <span className="text-black text-base" style={{ letterSpacing: '-0.05em' }}>PHOTOBOOK</span>
          <span className="text-cyan-200 text-base" style={{ letterSpacing: '-0.05em', marginTop: '-0.25rem' }}>VIETNAM</span>
        </div>
      )}
    </div>
  );
};

export default Logo;