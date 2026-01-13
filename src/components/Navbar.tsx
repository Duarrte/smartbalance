import React from 'react';

const Navbar: React.FC = () => {
  

  return (
    <header className="bg-white shadow-sm border-b-2 border-blue-100 px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto"> 
        
       
        <div className="flex items-center gap-3">
          <div className="bg-blue-800 text-white font-extrabold px-3 py-1.5 rounded-full text-base flex items-center justify-center">
            S
          </div>
          <span className="text-xl font-extrabold text-gray-900">SmartBalance</span>
        </div>


        
        <div className="flex items-center gap-1.5 text-lg">
          
          
          
        </div>
      </div>

     
      
    </header>
  );
};

export default Navbar;