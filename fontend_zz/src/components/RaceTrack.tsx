import React, { useEffect, useState } from 'react';
import { useCarContext } from './Carcontext';

interface RaceTrackProps {
  finishRace: (positions: any[]) => void;
}

interface CarStats {
  id: number;
  name: string;
  color: string;
  position: number;
  finished: boolean;
  speed: number;
  distance: number;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ finishRace }) => {
  const { selectedCar } = useCarContext();
  const [positions, setPositions] = useState<CarStats[]>(
    Array(7).fill(0).map((_, i) => ({
      id: i + 1,
      name: i === 0 ? selectedCar?.name || 'Player' : `Opponent ${i}`,
      color: i === 0 ? selectedCar?.color || '#FF5733' : `hsl(${i * 50}, 70%, 50%)`,
      position: 0,
      finished: false,
      speed: 0,
      distance: 0
    }))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [raceTime, setRaceTime] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(true);
    }
  }, [countdown]);

  // Race timer
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setRaceTime(prev => prev + 0.1);
    }, 100);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Car movement logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((car) => {
          if (car.finished) return car;
          
          const speed = Math.random() * 5;
          const newPosition = Math.min(car.position + speed, 100);
          const newDistance = car.distance + speed;
          
          return {
            ...car,
            position: newPosition,
            speed: speed,
            distance: newDistance,
            finished: newPosition >= 100,
          };
        })
      );
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Check if race is finished
  useEffect(() => {
    if (positions.every((car) => car.finished)) {
      finishRace(positions.sort((a, b) => b.position - a.position));
    }
  }, [positions, finishRace]);

  // Calculate race statistics
  const calculateStats = () => {
    return positions.map(car => ({
      ...car,
      averageSpeed: car.distance / raceTime || 0,
      completionTime: car.finished ? raceTime : null
    }));
  };

  const stats = calculateStats();

  return (
    <div className="relative h-screen bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 p-4">
        <h1 className="text-4xl font-bold text-center">Race Track</h1>
        {countdown > 0 ? (
          <div className="text-center text-2xl py-4">
            Race starts in: <span className="text-red-500 font-bold">{countdown}</span>
          </div>
        ) : (
          <div className="text-center text-xl py-2">
            Race time: <span className="text-yellow-400">{raceTime.toFixed(1)}</span> seconds
          </div>
        )}
      </div>

      <div className="flex h-[calc(100%-120px)]">
        {/* Race Track (70% width) */}
        <div className="relative w-[70%] h-full">
          {/* Start line */}
          <div className="absolute left-0 top-0 w-2 h-full bg-white z-10"></div>
          
          {/* Finish line */}
          <div className="absolute right-0 top-0 w-2 h-full bg-red-500 z-10"></div>

          {/* Lanes */}
          {Array(7).fill(0).map((_, index) => (
            <div
              key={index}
              className="absolute w-full border-t border-gray-700"
              style={{
                top: `${index * (100 / 7)}%`,
                height: `${100 / 7}%`,
              }}
            ></div>
          ))}

          {/* Cars */}
          {positions.map((car, index) => (
            <div
              key={car.id}
              className="absolute flex items-center transition-all duration-200"
              style={{
                top: `${index * (100 / 7) + (100 / 14)}%`,
                left: `${car.position}%`,
                transform: 'translateY(-50%)',
              }}
            >
              <div
                className="w-16 h-8 rounded-lg relative"
                style={{ backgroundColor: car.color }}
              >
                {car.finished && (
                  <div className="absolute -top-6 left-0 right-0 text-center text-xs font-bold">
                    #{positions.filter(c => c.finished).findIndex(c => c.id === car.id) + 1}
                  </div>
                )}
              </div>
              <span className="ml-2 text-sm">{car.name}</span>
            </div>
          ))}
        </div>

        {/* Statistics Panel (30% width) */}
        <div className="w-[30%] bg-gray-800 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Race Statistics</h2>
          
          <div className="space-y-4">
            {stats.map((car) => (
              <div key={car.id} className="bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: car.color }}
                  ></div>
                  <h3 className="font-bold">{car.name}</h3>
                  {car.finished && (
                    <span className="ml-auto bg-green-600 px-2 py-1 rounded text-xs">
                      Finished
                    </span>
                  )}
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Position:</span> 
                    <span className="ml-2">
                      {car.finished 
                        ? `#${positions.filter(c => c.finished).findIndex(c => c.id === car.id) + 1}`
                        : 'Racing'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Speed:</span> 
                    <span className="ml-2">{car.speed.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Distance:</span> 
                    <span className="ml-2">{car.distance.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Speed:</span> 
                    <span className="ml-2">{car.averageSpeed.toFixed(1)}</span>
                  </div>
                  {car.completionTime && (
                    <div className="col-span-2">
                      <span className="text-gray-400">Finish Time:</span> 
                      <span className="ml-2 text-yellow-400">
                        {car.completionTime.toFixed(1)}s
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;