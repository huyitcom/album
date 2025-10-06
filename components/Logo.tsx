import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center h-8" title="PTBVN Album Builder">
      <span 
        className="text-3xl font-black text-gray-800" 
        style={{ fontFamily: "'Fjalla One', sans-serif", letterSpacing: '-0.075em' }}
      >
        PHOTOBOOK
      </span>
     <span 
        className="text-3xl font-black text-cyan-800" 
        style={{ fontFamily: "'Fjalla One', sans-serif", letterSpacing: '-0.075em' }}
      >
        VIETNAM
      </span>
    </div>
  );
};

export default Logo;
