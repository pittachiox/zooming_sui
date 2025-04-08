import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainMenu from './components/MainMenu';
import GameCanvas from './components/GameCanvas';
import Garage from './components/Garage';
import Dealership from './components/dealership';
import { CarProvider } from './components/Carcontext';
import RaceTrack from './components/RaceTrack';
import RaceResults from './components/RaceResults';
import CarSelection from './components/CarSelection';

interface Car {
  id: number;
  name: string;
  color: string;
}

function App() {
  const [gameState, setGameState] = useState<'selection' | 'racing' | 'results'>('selection');
  const [positions, setPositions] = useState<any[]>([]);
  const [ownedCars, setOwnedCars] = useState<Car[]>([
    { id: 1, name: 'Speedster', color: '#FF5733' }, // รถตัวอย่าง
    { id: 2, name: 'Roadster', color: '#33FF57' }  // รถตัวอย่าง
  ]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const mockData = {
    address: "0x1234...5678",
    balance: {
      coins: 1,
      diamonds: 10,
      money: 15000
    }
  };

  const finishRace = (finalPositions: any[]) => {
    setPositions(finalPositions);
    setGameState('results');
  };

  const restartRace = () => {
    setPositions([]);
    setSelectedCar(null);
    setGameState('selection');
  };

  const startRace = () => {
    if (selectedCar) {
      setGameState('racing');
    } else {
      alert("Please select a car to race!");
    }
  };

  return (
    <CarProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navbar 
            coins={mockData.balance.coins}
            diamonds={mockData.balance.diamonds}
            money={mockData.balance.money}
            address={mockData.address}
          />
          <Routes>
            {/* หน้าแรก */}
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
            {/* เส้นทางสำหรับการเลือกและแข่งรถ */}
            <Route path="/carrace" element={
              gameState === 'selection' ? (
                <CarSelection
                  cars={ownedCars}
                  selectedCar={selectedCar}
                  setSelectedCar={setSelectedCar}
                  startRace={startRace}
                />
              ) : (
                <div className="min-h-screen bg-black">
                  {gameState === 'racing' && <RaceTrack finishRace={finishRace} />}
                  {gameState === 'results' && <RaceResults positions={positions} restartRace={restartRace} />}
                </div>
              )
            } />
            {/* เส้นทางสำหรับโรงรถ */}
            <Route path="/garage" element={<Garage />} />
            {/* เส้นทางสำหรับเลือกซื้อรถ */}
            <Route path="/dealership" element={
              <Dealership
                addCarToOwned={(car: Car) => setOwnedCars([...ownedCars, car])}
              />
            } />
          </Routes>
        </div>
      </Router>
    </CarProvider>
  );
}

export default App;