import React from 'react';
import { Car, Trophy, Wrench, Store, Settings } from 'lucide-react';
import Navbar from './components/Navbar';
import MainMenu from './components/MainMenu';
import GameCanvas from './components/GameCanvas';

function App() {
  const mockData = {
    address: "0x1234...5678",
    balance: {
      coins: 1,
      diamonds: 10,
      money: 15000
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      {/* Background Scene */}
      <div className="fixed inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-green-400 to-green-600" />
        <div className="absolute bottom-32 left-0 right-0 h-1 bg-gray-800" /> {/* Road line */}
        <div className="absolute bottom-40 left-0 right-0 h-40 bg-gradient-to-t from-gray-700 to-gray-800" /> {/* Road */}
        <div className="absolute bottom-80 left-0 right-0">
          <div className="h-20 w-full bg-gradient-to-t from-transparent to-sky-400" />
        </div>
      </div>

      {/* Game Content */}
      <div className="relative z-10">
        <Navbar 
          coins={mockData.balance.coins}
          diamonds={mockData.balance.diamonds}
          money={mockData.balance.money}
          address={mockData.address}
        />
        
        <main className="container mx-auto px-4 pt-20">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-8">
            <h1 className="pixel-font text-5xl font-bold text-white text-center mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              <span className="text-yellow-300">Zoom</span>
              <span className="text-blue-400">Zing</span>
            </h1>
            
            <GameCanvas />
            <MainMenu />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;