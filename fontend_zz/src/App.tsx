import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainMenu from './components/MainMenu';
import GameCanvas from './components/GameCanvas';
import Garage from './components/Garage';
import Dealership from './components/dealership';

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
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar 
          coins={mockData.balance.coins}
          diamonds={mockData.balance.diamonds}
          money={mockData.balance.money}
          address={mockData.address}
        />
        <Routes>
          <Route path="/" element={
            <main className="container mx-auto px-4 pt-20">
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-4">
                <h1 className="pixel-font text-7xl font-bold text-white text-center mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  <span className="text-red-500">Zoom</span>
                  <span className="text-red-500">Zing</span>
                </h1>
                <GameCanvas />
                <MainMenu />
              </div>
            </main>
          } />
          <Route path="/garage" element={<Garage />} />
          <Route path="/dealership" element={<Dealership />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;