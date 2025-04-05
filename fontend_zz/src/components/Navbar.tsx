import React from 'react';
import { Coins, Diamond, DollarSign } from 'lucide-react';

interface NavbarProps {
  coins: number;
  diamonds: number;
  money: number;
  address: string;
}

const Navbar: React.FC<NavbarProps> = ({ coins, diamonds, money, address }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Player Info */}
          <div className="text-white/80 text-sm font-pixel">
            {address}
          </div>

          {/* Currency Display */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-1">
              <Coins className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-white font-pixel text-sm">{coins}</span>
            </div>
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-1">
              <Diamond className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-white font-pixel text-sm">{diamonds}</span>
            </div>
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-1">
              <DollarSign className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-white font-pixel text-sm">{money.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;