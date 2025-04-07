import React, { useEffect, useRef, useState } from 'react';

const Garage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCustomParts, setShowCustomParts] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 200;

    // Car colors
    const colors = {
      body: '#FF4081',      // Bright pink
      windows: '#81D4FA',   // Light blue
      wheels: '#424242',    // Dark grey
      rims: '#FFFFFF',      // White
      highlights: '#FFD54F', // Amber
      shadow: '#AD1457'     // Dark pink
    };

    // Draw pixel perfect rectangle
    const drawPixelRect = (x: number, y: number, width: number, height: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));
    };

    // Draw car with pixel art style
    const drawCar = (x: number, y: number) => {
      // Car shadow
      drawPixelRect(x - 5, y + 70, 110, 10, 'rgba(0,0,0,0.2)');
    
      // --- Main Body ---
      drawPixelRect(x, y, 100, 30, colors.body); // bottom body
      drawPixelRect(x + 20, y - 20, 60, 25, colors.body); // top part (cabin)
    
      // --- Front slope (angled hood) ---
      drawPixelRect(x + 80, y - 10, 20, 10, colors.body);
    
      // --- Windows ---
      drawPixelRect(x + 25, y - 15, 20, 15, colors.windows);
      drawPixelRect(x + 55, y - 15, 20, 15, colors.windows);
    
      // --- Wheels ---
      drawPixelRect(x + 15, y + 25, 25, 25, colors.wheels);
      drawPixelRect(x + 60, y + 25, 25, 25, colors.wheels);
    
      // --- Rims ---
      drawPixelRect(x + 22, y + 32, 11, 11, colors.rims);
      drawPixelRect(x + 67, y + 32, 11, 11, colors.rims);
    };

    // Draw custom parts
    const drawSpoiler = (x: number, y: number) => {
      drawPixelRect(x - 15, y - 25, 50, 5, '#FFD700'); // spoiler
    };

    const drawFrontBumper = (x: number, y: number) => {
      drawPixelRect(x, y + 30, 100, 10, '#FF5733'); // front bumper
    };

    const drawRearBumper = (x: number, y: number) => {
      drawPixelRect(x - 10, y + 30, 20, 10, '#FF5733'); // rear bumper
    };

    const drawRims = (x: number, y: number) => {
      drawPixelRect(x + 22, y + 32, 11, 11, '#FFD700'); // custom rims
      drawPixelRect(x + 67, y + 32, 11, 11, '#FFD700');
    };

    const drawHood = (x: number, y: number) => {
      drawPixelRect(x + 20, y - 20, 60, 10, '#C70039'); // hood
    };

    const drawHeadlights = (x: number, y: number) => {
      drawPixelRect(x + 90, y + 5, 10, 10, '#FFFF00'); // headlights
    };

    const drawTaillights = (x: number, y: number) => {
      drawPixelRect(x - 10, y + 5, 10, 10, '#FF0000'); // taillights
    };

    const drawSideMirrors = (x: number, y: number) => {
      drawPixelRect(x - 10, y - 10, 10, 5, '#FFFFFF'); // side mirrors
    };

    const drawBodyKit = (x: number, y: number) => {
      drawPixelRect(x, y + 30, 100, 5, '#00FF00'); // body kit
    };

    const drawSideSkirt = (x: number, y: number) => {
      drawPixelRect(x, y + 35, 100, 5, '#00FFFF'); // side skirt
    };

    const drawExhaustTip = (x: number, y: number) => {
      drawPixelRect(x - 15, y + 25, 5, 5, '#A9A9A9'); // exhaust tip
    };

    const drawPaintJob = (x: number, y: number) => {
      drawPixelRect(x, y, 100, 30, '#800080'); // paint job
    };

    // Clear canvas and redraw car with selected part
    const redraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCar(350, 100);

      switch (selectedPart) {
        case 'Spoiler':
          drawSpoiler(350, 100);
          break;
        case 'Front Bumper':
          drawFrontBumper(350, 100);
          break;
        case 'Rear Bumper':
          drawRearBumper(350, 100);
          break;
        case 'Rims':
          drawRims(350, 100);
          break;
        case 'Hood':
          drawHood(350, 100);
          break;
        case 'Headlights':
          drawHeadlights(350, 100);
          break;
        case 'Taillights':
          drawTaillights(350, 100);
          break;
        case 'Side Mirrors':
          drawSideMirrors(350, 100);
          break;
        case 'Body Kit':
          drawBodyKit(350, 100);
          break;
        case 'Side Skirt':
          drawSideSkirt(350, 100);
          break;
        case 'Exhaust Tip':
          drawExhaustTip(350, 100);
          break;
        case 'Paint Job':
          drawPaintJob(350, 100);
          break;
        default:
          break;
      }
    };

    redraw();
  }, [selectedPart]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-pixel">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-800" />

      {/* Main Garage Area */}
      <div className="relative z-10 container mx-auto px-4 py-10">
        <h2 className="text-4xl text-center mt-10 mb-8 drop-shadow">GARAGE</h2>

        {/* Garage Building */}
        <div className="bg-gray-700 border-4 border-red-500 w-full max-w-4xl mx-auto rounded-xl shadow-lg p-6 flex flex-col items-center">
          {/* Car Canvas */}
          <canvas
            ref={canvasRef}
            className="rounded-xl shadow-lg border-2 border-gray-600"
            style={{ maxWidth: '100%', height: 'auto', imageRendering: 'pixelated' }}
          />

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {/* CUSTOM PARTS Button */}
            <button
                className="bg-gray-800 py-3 px-6 rounded-md border border-white hover:bg-gray-700"
                onClick={() => setShowCustomParts(!showCustomParts)}
            >
                CUSTOM PARTS
            </button>

            {/* CAR SLOT Button */}
            <button
                className="bg-gray-800 py-3 px-6 rounded-md border border-white hover:bg-gray-700"
                onClick={() => alert('Car Slot functionality coming soon!')}
            >
                CAR SLOT
            </button>

            <button
                className="bg-gray-800 py-3 px-6 rounded-md border border-white hover:bg-gray-700"
                onClick={() => alert('Car Slot functionality coming soon!')}
            >
                ARTIFACTS
            </button>
            </div>

            

          {/* Custom Parts Section */}
          {showCustomParts && (
            <div className="mt-8 bg-gray-800 p-4 rounded-md w-full">
              <h3 className="text-2xl mb-4">Select Custom Parts</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Spoiler',
                  'Front Bumper',
                  'Rear Bumper',
                  'Rims',
                  'Hood',
                  'Headlights',
                  'Taillights',
                  'Side Mirrors',
                  'Body Kit',
                  'Side Skirt',
                  'Exhaust Tip',
                  'Paint Job',
                ].map((part) => (
                  <li
                    key={part}
                    className="bg-gray-700 p-3 rounded-md border border-gray-600 hover:bg-gray-600 cursor-pointer"
                    onClick={() => setSelectedPart(part)}
                  >
                    {part}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Garage;