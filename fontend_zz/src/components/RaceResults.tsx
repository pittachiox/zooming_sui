import React from 'react';

interface RaceResultsProps {
  positions: any[];
  restartRace: () => void;
}

const RaceResults: React.FC<RaceResultsProps> = ({ positions, restartRace }) => {
  const prizeMoney = [10000, 5000, 2000]; // รางวัลสำหรับอันดับ 1, 2, 3

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Race Results</h1>
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6">
        {positions.map((car, index) => (
          <div
            key={car.id}
            className={`flex justify-between p-4 rounded-lg ${
              index === 0
                ? 'bg-yellow-500'
                : index === 1
                ? 'bg-gray-500'
                : index === 2
                ? 'bg-brown-500'
                : 'bg-gray-700'
            }`}
          >
            <span>
              #{index + 1} {car.name}
            </span>
            <span>
              {index < 3 ? `$${prizeMoney[index].toLocaleString()}` : 'No Prize'}
            </span>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-lg text-xl font-bold"
        onClick={restartRace}
      >
        Restart Race
      </button>
    </div>
  );
};

export default RaceResults;