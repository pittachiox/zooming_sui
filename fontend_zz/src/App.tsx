import React from 'react';
// Removed unused import from 'lucide-react'
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
    <div className="min-h-screen bg-black">
      {/* Background Scene */}
      <div className="fixed inset-0 z-0">
        {/* ลบส่วนพื้นหลังที่เป็น gradient */}
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
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-4">
            {/* ลดระยะห่างระหว่างชื่อเกมและ Canvas */}
            <h1 className="pixel-font text-7xl font-bold text-white text-center mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              <span className="text-red-500">Zoom</span>
              <span className="text-red-500">Zing</span>
            </h1>
            
            {/* Canvas */}
            <GameCanvas />

            {/* Main Menu */}
            <MainMenu />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;