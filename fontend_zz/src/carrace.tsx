import React, { useState, useEffect, useCallback } from 'react';

// Define all interfaces and types
interface PrizeMoney {
  [key: number]: number;
}

interface OpponentCar {
  id: number;
  position: number;
  lane: number;
  speed: number;
  color: string;
  topColor: string;
  accentColor: string;
  shadow: string;
  finished: boolean;
  name: string;
}

interface PlayerCar {
  id: number;
  name: string;
  color: string;
  topColor: string;
  accentColor: string;
  shadow: string;
  speed: number;
  acceleration: number;
  description: string;
}

interface RaceCarPosition extends InterfaceCar {
  position: number;
  prize: number;
  score: number;
}

interface InterfaceCar {
  id: number;
  position: number;
  finished: boolean;
  name: string;
  isPlayer: boolean;
  carColor: string;
  progress: number;
}

interface TrophyProps {
  rank: number;
  prize: number;
}

interface CarPositionIndicatorProps {
  car: InterfaceCar;
}

interface LaneProps {
  number: number;
}

interface StartFinishLineProps {
  position: string;
}

interface SideViewCarProps {
  car: PlayerCar | OpponentCar;
}

export default function CarRace(): React.ReactElement {
  // Game state
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [carPosition, setCarPosition] = useState<number>(0);
  const [selectedLane, setSelectedLane] = useState<number>(3);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<PlayerCar | null>(null);
  const [playerFinished, setPlayerFinished] = useState<boolean>(false);
  const [racePositions, setRacePositions] = useState<RaceCarPosition[]>([]);
  const [prizeMoney] = useState<PrizeMoney>({
    1: 10000,
    2: 5000,
    3: 2000
  });
  const [opponents, setOpponents] = useState<OpponentCar[]>([
    { id: 1, position: 0, lane: 1, speed: 3, color: "bg-purple-600", topColor: "bg-purple-500", accentColor: "bg-purple-700", shadow: "shadow-purple-500/50", finished: false, name: "Purple Racer" },
    { id: 2, position: 0, lane: 2, speed: 4, color: "bg-pink-600", topColor: "bg-pink-500", accentColor: "bg-pink-700", shadow: "shadow-pink-500/50", finished: false, name: "Pink Speedster" },
    { id: 3, position: 0, lane: 4, speed: 5, color: "bg-orange-600", topColor: "bg-orange-500", accentColor: "bg-orange-700", shadow: "shadow-orange-500/50", finished: false, name: "Orange Flash" },
    { id: 4, position: 0, lane: 5, speed: 3, color: "bg-teal-600", topColor: "bg-teal-500", accentColor: "bg-teal-700", shadow: "shadow-teal-500/50", finished: false, name: "Teal Tornado" },
    { id: 5, position: 0, lane: 6, speed: 4, color: "bg-indigo-600", topColor: "bg-indigo-500", accentColor: "bg-indigo-700", shadow: "shadow-indigo-500/50", finished: false, name: "Indigo Blaze" },
    { id: 6, position: 0, lane: 7, speed: 5, color: "bg-gray-600", topColor: "bg-gray-500", accentColor: "bg-gray-700", shadow: "shadow-gray-500/50", finished: false, name: "Gray Ghost" }
  ]);
  
  // Available cars
  const cars: PlayerCar[] = [
    {
      id: 1,
      name: "Red Fury",
      color: "bg-red-600",
      topColor: "bg-red-500",
      accentColor: "bg-red-700",
      shadow: "shadow-red-500/50",
      speed: 6,
      acceleration: 9,
      description: "Classic red racer with balanced performance"
    },
    {
      id: 2,
      name: "Blue Lightning",
      color: "bg-blue-600",
      topColor: "bg-blue-500",
      accentColor: "bg-blue-700",
      shadow: "shadow-blue-500/50",
      speed: 6,
      acceleration: 9,
      description: "Sleek blue racer with high top speed"
    },
    {
      id: 3,
      name: "Green Beast",
      color: "bg-green-600",
      topColor: "bg-green-500",
      accentColor: "bg-green-700",
      shadow: "shadow-green-500/50",
      speed: 6,
      acceleration: 9,
      description: "Eco-friendly racer with quick acceleration"
    },
    {
      id: 4,
      name: "Yellow Bullet",
      color: "bg-yellow-500",
      topColor: "bg-yellow-400",
      accentColor: "bg-yellow-600",
      shadow: "shadow-yellow-500/50",
      speed: 6,
      acceleration: 9,
      description: "Bright yellow racer with extreme speed"
    }
  ];
  
  // Calculate race positions
  const calculatePositions = useCallback((): void => {
    const allCars: InterfaceCar[] = [
      {
        id: 0,
        position: carPosition,
        finished: playerFinished,
        name: selectedCar?.name || "Player",
        isPlayer: true,
        carColor: selectedCar?.topColor || "bg-gray-600",
        progress: Math.floor(carPosition)
      },
      ...opponents.map(o => ({
        ...o,
        isPlayer: false,
        carColor: o.color,
        progress: Math.floor(o.position)
      }))
    ];
    
    // Sort by position
    const sorted = [...allCars].sort((a, b) => {
      if (a.finished && !b.finished) return -1;
      if (!a.finished && b.finished) return 1;
      return b.position - a.position;
    });
    
    // Assign positions and prizes
    const withPositions: RaceCarPosition[] = sorted.map((car, index) => ({
      ...car,
      position: index + 1,
      prize: prizeMoney[index + 1] || 0,
      score: Math.floor(car.position * 10)
    }));
    
    setRacePositions(withPositions);
    
    // Check if race is complete
    if (sorted.every(car => car.finished)) {
      setIsGameOver(true);
    }
  }, [carPosition, playerFinished, opponents, selectedCar, prizeMoney]);
  
  // Move player car automatically
  const movePlayerCar = useCallback((): void => {
    if (!selectedCar || playerFinished) return;
    setCarPosition(prev => {
      const speedVariation = Math.random() > 0.7 ? (Math.random() > 0.5 ? 0.3 : -0.3) : 0;
      const effectiveSpeed = Math.max(2, Math.min(7, selectedCar.speed + speedVariation));
      const newPosition = Math.min(prev + effectiveSpeed * 0.5, 100);
      
      if (newPosition >= 90 && !playerFinished) {
        setPlayerFinished(true);
      }
      
      return newPosition;
    });
  }, [selectedCar, playerFinished]);
  
  // Move all cars and update positions
  useEffect(() => {
    if (gameStarted && !isGameOver) {
      const interval = setInterval(() => {
        movePlayerCar();
        setOpponents(prevOpponents =>
          prevOpponents.map(opponent => {
            if (opponent.finished) return opponent;
            
            const speedVariation = Math.random() > 0.7 ? (Math.random() > 0.5 ? 0.3 : -0.3) : 0;
            const newSpeed = Math.max(2, Math.min(7, opponent.speed + speedVariation));
            const newPosition = Math.min(opponent.position + newSpeed * 0.5, 100);
            const hasFinished = newPosition >= 90;
            
            return {
              ...opponent,
              position: newPosition,
              speed: newSpeed,
              finished: hasFinished
            };
          })
        );
        calculatePositions();
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [gameStarted, isGameOver, movePlayerCar, calculatePositions]);
  
  // Trophy component with prize money
  const Trophy: React.FC<TrophyProps> = ({ rank, prize }) => {
    let medal = "";
    if (rank === 1) {
      medal = "🥇";
    } else if (rank === 2) {
      medal = "🥈";
    } else if (rank === 3) {
      medal = "🥉";
    }
    
    return (
      <div className="flex items-center">
        <div className="text-4xl mr-2">{medal}</div>
        {prize > 0 && <div className="text-green-400 font-bold">${prize.toLocaleString()}</div>}
      </div>
    );
  };
  
  // Car position indicator
  const CarPositionIndicator: React.FC<CarPositionIndicatorProps> = ({ car }) => (
    <div className="flex items-center">
      <div
        className={`w-6 h-6 rounded-full ${car.carColor} mr-2`}
        style={{ boxShadow: `0 0 8px ${car.carColor.replace('bg', 'shadow') + '/50'}` }}
      ></div>
      <span className="font-medium">{car.name}</span>
      {car.isPlayer && <span className="ml-2 text-yellow-300">(You)</span>}
    </div>
  );
  
  // Lane component
  const Lane: React.FC<LaneProps> = ({ number }) => {
    const laneHeight = `${100 / 7}%`;
    return (
      <div
        className={`absolute left-0 right-0 border-t-2 border-b-2 border-white border-opacity-30`}
        style={{
          top: `${(number - 1) * (100 / 7)}%`,
          height: laneHeight,
        }}
      >
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white font-bold text-xl">
          {number}
        </div>
        {/* Lane markers */}
        <div className="absolute inset-0 flex justify-between items-center px-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-8 h-1 bg-white opacity-30" />
          ))}
        </div>
      </div>
    );
  };
  
  // Start/finish line component
  const StartFinishLine: React.FC<StartFinishLineProps> = ({ position }) => (
    <div className={`absolute ${position} inset-y-0 w-8 flex flex-col items-center overflow-hidden`}>
      <div className="absolute inset-0 grid grid-cols-2 gap-0">
        {[...Array(14)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className={`h-8 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-black'}`} />
            <div className={`h-8 ${rowIndex % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
  
  // Side-view car component
  const SideViewCar: React.FC<SideViewCarProps> = ({ car }) => (
    <div className="relative w-64 h-32">
      <div className={`absolute bottom-0 left-0 right-0 h-16 ${car.color} rounded-lg`}>
        <div className={`absolute top-0 left-8 right-8 h-6 ${car.topColor} rounded-t-lg`}></div>
        <div className="absolute top-2 left-10 right-10 h-4 bg-blue-900/50 rounded-t-sm"></div>
        <div className="absolute bottom-2 left-2 w-4 h-2 bg-yellow-200 rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-4 h-2 bg-red-500 rounded-full"></div>
        <div className={`absolute bottom-4 left-16 right-16 h-1 ${car.accentColor}`}></div>
      </div>
      <div className="absolute bottom-0 left-4 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600"></div>
      <div className="absolute bottom-0 right-4 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600"></div>
      <div className={`absolute top-2 left-24 right-24 h-2 ${car.accentColor} rounded-t-sm`}></div>
    </div>
  );
  
  // Reset opponents function to avoid code duplication
  const resetOpponents = (): OpponentCar[] => {
    return [
      { id: 1, position: 0, lane: 1, speed: 3, color: "bg-purple-600", topColor: "bg-purple-500", accentColor: "bg-purple-700", shadow: "shadow-purple-500/50", finished: false, name: "Purple Racer" },
      { id: 2, position: 0, lane: 2, speed: 4, color: "bg-pink-600", topColor: "bg-pink-500", accentColor: "bg-pink-700", shadow: "shadow-pink-500/50", finished: false, name: "Pink Speedster" },
      { id: 3, position: 0, lane: 4, speed: 5, color: "bg-orange-600", topColor: "bg-orange-500", accentColor: "bg-orange-700", shadow: "shadow-orange-500/50", finished: false, name: "Orange Flash" },
      { id: 4, position: 0, lane: 5, speed: 3, color: "bg-teal-600", topColor: "bg-teal-500", accentColor: "bg-teal-700", shadow: "shadow-teal-500/50", finished: false, name: "Teal Tornado" },
      { id: 5, position: 0, lane: 6, speed: 4, color: "bg-indigo-600", topColor: "bg-indigo-500", accentColor: "bg-indigo-700", shadow: "shadow-indigo-500/50", finished: false, name: "Indigo Blaze" },
      { id: 6, position: 0, lane: 7, speed: 5, color: "bg-gray-600", topColor: "bg-gray-500", accentColor: "bg-gray-700", shadow: "shadow-gray-500/50", finished: false, name: "Gray Ghost" }
    ];
  };
  
  // Car selection screen
  const CarSelection: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-90 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Choose Your Racing Car</h1>
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl mb-12">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`relative p-6 rounded-xl transition-all duration-300 cursor-pointer border-4 ${
              selectedCar?.id === car.id
                ? `border-${car.color.split('-')[1]}-500 scale-105`
                : 'border-transparent hover:border-white/50'
            }`}
            onClick={() => setSelectedCar(car)}
          >
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-${car.color.split('-')[1]}-900/30 to-black/70`} />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">{car.name}</h2>
              <div className="flex justify-center mb-4">
                <SideViewCar car={car} />
              </div>
              <p className="text-gray-300">Speed: {car.speed}/7</p>
              <p className="text-gray-300">Acceleration: {car.acceleration}/10</p>
              <p className="text-gray-300 text-sm mt-2">{car.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`px-8 py-4 text-xl rounded-lg transition-all duration-300 ${
          selectedCar
            ? 'bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 transform hover:scale-105'
            : 'bg-gray-600 cursor-not-allowed'
        } text-white font-bold shadow-lg`}
        onClick={() => {
          if (selectedCar) {
            setGameStarted(true);
            setPlayerFinished(false);
            setIsGameOver(false);
            setCarPosition(0);
            setOpponents(resetOpponents());
          }
        }}
        disabled={!selectedCar}
      >
        {selectedCar ? `Race with ${selectedCar.name}` : 'Please select a car'}
      </button>
    </div>
  );
  
  // If game hasn't started, show car selection
  if (!gameStarted) {
    return <CarSelection />;
  }
  
  // Main game screen
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600">
      {isGameOver ? (
        
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-90 text-white p-4 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-8">Race Results</h1>
          <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Final Standings</h2>
            <div className="space-y-4">
              {racePositions.slice(0, 6).map((car) => (
                <div
                  key={car.position}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    car.position === 1 ? "bg-blue-900" : "bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 text-center text-xl font-bold">
                      #{car.position}
                    </div>
                    <div className="ml-4">
                      <CarPositionIndicator car={car} />
                      <div className="text-sm text-gray-300">
                        Progress: {car.progress}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">Score: {car.score}</div>
                  
                    {car.position <= 3 && (
                      <div className="text-green-400 font-bold">
                        ${car.prize.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-bold"
            onClick={() => {
              setIsGameOver(false);
              setCarPosition(0);
              setGameStarted(false);
              setPlayerFinished(false);
              setOpponents(resetOpponents());
            }}
          >
            Race Again
          </button>
        </div>
      ) : (
        
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500" />
          <div className="absolute top-0 inset-x-0 bg-black bg-opacity-80 text-white p-4 h-20 shadow-lg">
            <div className="container mx-auto grid grid-cols-5 gap-8">
              <div>
                <p className="text-xs opacity-70">Position</p>
                <p className="text-xl font-bold">
                  {playerFinished ? "Finished" : "Racing..."}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-70">Progress</p>
                <p className="text-xl font-bold">{Math.floor(carPosition)}%</p>
              </div>
              <div>
                <p className="text-xs opacity-70">Lane</p>
                <p className="text-xl font-bold">{selectedLane}</p>
              </div>
              <div>
                <p className="text-xs opacity-70">Car</p>
                <p className="text-xl font-bold">{selectedCar?.name}</p>
              </div>
              <div>
                <p className="text-xs opacity-70">Speed</p>
                <p className="text-xl font-bold">{selectedCar?.speed}/7</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-4 top-24 bottom-16">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-700">
                <div className="absolute inset-0 bg-gray-800 opacity-30" />
                <div className="relative h-full">
                  {[1, 2, 3, 4, 5, 6, 7].map((laneNumber) => (
                    <Lane
                      key={laneNumber}
                      number={laneNumber}
                    />
                  ))}
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg flex items-center justify-center">
                    <div className="w-2 h-full bg-yellow-400 opacity-50" />
                  </div>
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-red-600 to-yellow-500 shadow-lg flex items-center justify-center">
                    <div className="w-2 h-full bg-yellow-400 opacity-50" />
                  </div>
                  <StartFinishLine position="left-40" />
                  <StartFinishLine position="right-40" />
                  {selectedCar && (
                    <div
                      className={`absolute ${selectedCar.color} w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
                        playerFinished ? 'opacity-70' : ''
                      }`}
                      style={{
                        left: `${carPosition}%`,
                        top: `${((selectedLane - 1) * (100 / 7)) + (100 / 14)}%`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 20px ${selectedCar.shadow}, 0 4px 8px rgba(0, 0, 0, 0.3)`,
                        zIndex: 20
                      }}
                    >
                      <div className={`absolute inset-2 ${selectedCar.topColor} rounded-full`} />
                      <div className={`absolute inset-4 ${selectedCar.accentColor} rounded-full`} />
                    </div>
                  )}
                  {opponents.map((opponent) => (
                    <div
                      key={opponent.id}
                      className={`absolute ${opponent.color} w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
                        opponent.finished ? 'opacity-50' : ''
                      }`}
                      style={{
                        left: `${opponent.position}%`,
                        top: `${((opponent.lane - 1) * (100 / 7)) + (100 / 14)}%`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 20px ${opponent.shadow}, 0 4px 8px rgba(0, 0, 0, 0.3)`,
                        zIndex: 10
                      }}
                    >
                      <div className={`absolute inset-2 ${opponent.topColor} rounded-full`} />
                      <div className={`absolute inset-4 ${opponent.accentColor} rounded-full`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}