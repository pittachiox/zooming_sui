import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Wrench, Store } from 'lucide-react';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Car className="w-6 h-6" />, label: 'RACE' },
    { icon: <Wrench className="w-6 h-6" />, label: 'GARAGE' },
    { icon: <Store className="w-6 h-6" />, label: 'DEALERSHIP' },
  ];

  const handleMenuClick = (label: string) => {
    if (label === 'GARAGE') {
      navigate('/garage'); // นำทางไปหน้า Garage
    } else if (label === 'DEALERSHIP') {
      navigate('/dealership'); // นำทางไปหน้า Dealership
    } else if (label === 'RACE') {
      alert('Race functionality coming soon!'); // ตัวอย่างสำหรับ RACE
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleMenuClick(item.label)}
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