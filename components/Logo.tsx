import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center h-8" title="PHOTOBOOKVIETNAM Album Builder">
      {/* Desktop Logo */}
      <span 
        className="hidden md:inline text-3xl" 
        style={{ 
          fontFamily: "'Fjalla One', sans-serif", 
          letterSpacing: '-0.075em',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
        }}
      >
        <span className="text-black">PHOTOBOOK</span><span className="text-cyan-200">VIETNAM</span>
      </span>
      {/* Mobile Logo */}
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
    </div>
  );
};

export default Logo;
