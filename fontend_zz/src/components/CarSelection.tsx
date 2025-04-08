import React, { useState } from 'react';

interface Car {
  id: number;
  name: string;
  color: string;
}

interface CarSelectionProps {
  cars: Car[];
  selectedCar: Car | null;
  setSelectedCar: (car: Car) => void;
  startRace: (betAmount: number) => void; // เพิ่มจำนวนเงินเดิมพัน
}

const CarSelection: React.FC<CarSelectionProps> = ({ cars, selectedCar, setSelectedCar, startRace }) => {
  const [betAmount, setBetAmount] = useState<number | null>(null); // จำนวนเงินเดิมพัน

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Select Your Car</h1>
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl mb-12">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`p-6 rounded-lg border-4 cursor-pointer transition-transform ${
              selectedCar?.id === car.id ? 'border-yellow-500 scale-105' : 'border-gray-700'
            }`}
            onClick={() => setSelectedCar(car)}
          >
            <h2 className="text-2xl font-bold">{car.name}</h2>
            <div className={`w-16 h-8 mt-4 rounded-lg`} style={{ backgroundColor: car.color }}></div>
          </div>
        ))}
      </div>

      {/* ตัวเลือกจำนวนเงินเดิมพัน */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Select Bet Amount</h2>
        <div className="flex gap-4">
          {[500, 1000, 1500].map((amount) => (
            <button
              key={amount}
              className={`px-6 py-3 text-lg font-bold rounded-lg ${
                betAmount === amount ? 'bg-yellow-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setBetAmount(amount)}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      {/* ปุ่มเริ่มแข่ง */}
      <button
        className={`px-6 py-3 text-lg font-bold rounded-lg ${
          selectedCar && betAmount ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 cursor-not-allowed'
        }`}
        onClick={() => betAmount && startRace(betAmount)}
        disabled={!selectedCar || !betAmount}
      >
        {selectedCar ? `Race with ${selectedCar.name}` : 'Select a car to race'}
      </button>
    </div>
  );
};

export default CarSelection;