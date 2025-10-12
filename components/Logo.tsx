import React from 'react';

interface LogoProps {
  forceFull?: boolean;
}

const Logo: React.FC<LogoProps> = ({ forceFull = false }) => {
  return (
    <div className="flex items-center h-8" title="PHOTOBOOKVIETNAM Album Builder">
      {/* Full Logo */}
      <span 
        className={forceFull ? "inline text-3xl" : "hidden md:inline text-3xl"}
        style={{ 
          fontFamily: "'Fjalla One', sans-serif", 
          letterSpacing: '-0.075em',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
        }}
      >
        <span className="text-black">PHOTOBOOK</span><span className="text-cyan-200">VIETNAM</span>
      </span>
      
      {/* Short Logo (only shows on mobile if not forceFull) */}
      {!forceFull && (
        <span 
          className="md:hidden text-3xl" 
          style={{ 
            fontFamily: "'Fjalla One', sans-serif", 
            letterSpacing: '-0.075em',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
          }}
        >
          <span className="text-black">PTB</span><span className="text-cyan-200">VN</span>
        </span>
      )}
    </div>
  );
};

export default Logo;