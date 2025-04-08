import React, { useRef, useEffect } from 'react';
import { useCarContext } from './Carcontext';


interface Car {
  id: number;
  name: string;
  price: number;
  color: string;
}

const cars: Car[] = [
  { id: 1, name: 'Speedster', price: 5000, color: '#FF5733' },
  { id: 2, name: 'Roadster', price: 7000, color: '#33FF57' },
  { id: 3, name: 'Cruiser', price: 10000, color: '#3357FF' },
  { id: 4, name: 'Thunder', price: 15000, color: '#FFD700' },
  { id: 5, name: 'Shadow', price: 20000, color: '#424242' },
];

const Dealership: React.FC = () => {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const { setSelectedCar } = useCarContext();

  useEffect(() => {
    cars.forEach((car, index) => {
      const canvas = canvasRefs.current[index];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw pixel-perfect rectangle
      const drawPixelRect = (x: number, y: number, width: number, height: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));
      };

      // Draw car
      const drawCar = (x: number, y: number, color: string) => {
        // Car shadow
        drawPixelRect(x - 5, y + 70, 110, 10, 'rgba(0,0,0,0.2)');

        // Main Body
        drawPixelRect(x, y, 100, 30, color); // bottom body
        drawPixelRect(x + 20, y - 20, 60, 25, color); // top part (cabin)

        // Front slope (angled hood)
        drawPixelRect(x + 80, y - 10, 20, 10, color);

        // Windows
        drawPixelRect(x + 25, y - 15, 20, 15, '#81D4FA'); // light blue
        drawPixelRect(x + 55, y - 15, 20, 15, '#81D4FA');

        // Wheels
        drawPixelRect(x + 15, y + 25, 25, 25, '#424242'); // dark grey
        drawPixelRect(x + 60, y + 25, 25, 25, '#424242');

        // Rims
        drawPixelRect(x + 22, y + 32, 11, 11, '#FFFFFF'); // white
        drawPixelRect(x + 67, y + 32, 11, 11, '#FFFFFF');
      };

      // Clear canvas and draw car
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCar(50, 50, car.color);
    });
  }, []);

  const handleBuyCar = (car: Car) => {
    setSelectedCar(car);
    alert(`You bought ${car.name} for $${car.price.toLocaleString()}!`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-pixel">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-4xl text-center mb-8 drop-shadow mt-16">DEALERSHIP</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div
              key={car.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center"
            >
              {/* Car Canvas */}
              <canvas
                ref={(el) => (canvasRefs.current[index] = el)}
                width={200}
                height={150}
                className="rounded-lg border-2 border-gray-700"
              />

              {/* Car Info */}
              <h3 className="text-xl mt-4">{car.name}</h3>
              <p className="text-lg text-yellow-400">${car.price.toLocaleString()}</p>
              <button
                className="mt-4 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={() => handleBuyCar(car)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dealership;