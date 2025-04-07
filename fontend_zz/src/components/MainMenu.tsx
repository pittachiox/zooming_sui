import React from 'react';
import { Car, Wrench, Store, Settings, Trophy } from 'lucide-react';

const MainMenu: React.FC = () => {
  const menuItems = [
    { icon: <Car className="w-6 h-6" />, label: 'RACE' },
    { icon: <Wrench className="w-6 h-6" />, label: 'GARAGE' },
    { icon: <Store className="w-6 h-6" />, label: 'DEALERSHIP' },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-lg 
                     transform transition-all duration-200 hover:scale-105 hover:bg-gray-800
                     border-2 border-gray-700 shadow-lg"
        >
          {item.icon}
          <span className="font-pixel text-lg tracking-wider">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MainMenu;