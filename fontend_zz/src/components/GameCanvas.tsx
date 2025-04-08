import React, { useEffect, useRef } from 'react';
import { useCarContext } from './Carcontext';

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { selectedCar } = useCarContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Car colors
    const colors = {
      body: selectedCar?.color || '#FF4081', // Use selected car color or default
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
    const drawCar = (x: number, y: number, bounce: number) => {
      // Car shadow
      drawPixelRect(x - 5, y + 70 - bounce / 2, 110, 10, 'rgba(0,0,0,0.2)');
    
      // --- Spoiler ---
      drawPixelRect(x - 10, y - 10 + bounce, 10, 5, colors.shadow); // spoiler support
      drawPixelRect(x - 15, y - 15 + bounce, 20, 5, colors.body); // main spoiler
    
      // --- Main Body ---
      drawPixelRect(x, y + bounce, 100, 30, colors.body); // bottom body
      drawPixelRect(x + 20, y - 20 + bounce, 60, 25, colors.body); // top part (cabin)
    
      // --- Front slope (angled hood) ---
      drawPixelRect(x + 80, y - 10 + bounce, 20, 10, colors.body);
    
      // --- Roof scoop (air intake) ---
      drawPixelRect(x + 40, y - 25 + bounce, 20, 5, colors.shadow);
    
      // --- Windows ---
      drawPixelRect(x + 25, y - 15 + bounce, 20, 15, colors.windows);
      drawPixelRect(x + 55, y - 15 + bounce, 20, 15, colors.windows);
    
      // --- Racing stripe ---
      drawPixelRect(x + 10, y + bounce + 2, 5, 26, colors.highlights);
      drawPixelRect(x + 85, y + bounce + 2, 5, 26, colors.highlights);
    
      // --- Wheels ---
      const wheelOffset = Math.sin(Date.now() / 100) * 2;
      drawPixelRect(x + 15, y + 25 + bounce + wheelOffset, 25, 25, colors.wheels);
      drawPixelRect(x + 60, y + 25 + bounce + wheelOffset, 25, 25, colors.wheels);
    
      // --- Rims ---
      drawPixelRect(x + 22, y + 32 + bounce + wheelOffset, 11, 11, colors.rims);
      drawPixelRect(x + 67, y + 32 + bounce + wheelOffset, 11, 11, colors.rims);
    
      // --- Speed lines ---
      ctx.strokeStyle = colors.highlights;
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        const lineX = x - 40 - i * 20;
        ctx.beginPath();
        ctx.moveTo(lineX, y + 15 + i * 5 + bounce);
        ctx.lineTo(lineX - 20, y + 15 + i * 5 + bounce);
        ctx.stroke();
      }
    };

    // Draw road with pixel art style
    const drawRoad = () => {
      // Road background
      drawPixelRect(0, 300, canvas.width, 100, '#424242');
      
      // Road lines
      ctx.fillStyle = '#FFFFFF';
      for (let x = 0; x < canvas.width; x += 40) {
        drawPixelRect(x, 340, 20, 4, '#FFFFFF');
      }
    };

    // Draw clouds
    const drawCloud = (x: number, y: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      drawPixelRect(x, y, 40, 20, 'rgba(255, 255, 255, 0.8)');
      drawPixelRect(x + 10, y - 10, 30, 15, 'rgba(255, 255, 255, 0.8)');
      drawPixelRect(x + 20, y + 5, 30, 15, 'rgba(255, 255, 255, 0.8)');
    };

    let frame = 0;
    let cloudPosition = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#87CEEB'; // Sky blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw moving clouds
      cloudPosition = (cloudPosition + 0.5) % canvas.width;
      drawCloud(cloudPosition, 50);
      drawCloud((cloudPosition + 300) % canvas.width, 100);
      drawCloud((cloudPosition + 600) % canvas.width, 70);

      // Draw road
      drawRoad();
      
      // Animate road lines
      frame = (frame - 4) % 40;
      ctx.fillStyle = '#FFFFFF';
      for (let x = frame; x < canvas.width; x += 40) {
        drawPixelRect(x, 340, 20, 4, '#FFFFFF');
      }

      // Draw car with bounce effect
      const bounce = Math.sin(Date.now() / 150) * 2;
      drawCar(350, 200, bounce);

      requestAnimationFrame(animate);
    };

    animate();
  }, [selectedCar]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-xl shadow-2xl border-4 border-white/10 backdrop-blur-sm"
      style={{ 
        maxWidth: '100%',
        height: 'auto',
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default GameCanvas;