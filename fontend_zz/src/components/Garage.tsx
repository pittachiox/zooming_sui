import React from 'react';

const Garage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-pixel">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-800" />

      {/* Main Garage Area */}
      <div className="relative z-10 container mx-auto px-4 py-10">
        <h2 className="text-4xl text-center mb-8 drop-shadow">GARAGE</h2>

        {/* Garage Building */}
        <div className="bg-gray-700 border-4 border-red-500 w-full max-w-4xl mx-auto rounded-xl shadow-lg p-6 flex flex-col items-center">
          <div className="bg-gray-300 w-full h-40 mb-4 rounded-md shadow-inner" />

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <button className="bg-gray-800 py-3 px-6 rounded-md border border-white hover:bg-gray-700">
              RENAME CAR
            </button>
            <button className="bg-gray-800 py-3 px-6 rounded-md border border-white hover:bg-gray-700">
              EXTRA CAR SLOT
            </button>
            <button className="bg-gray-800 py-3 px-6 rounded-md border border-white hover:bg-gray-700">
              CUSTOM DECAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garage;
