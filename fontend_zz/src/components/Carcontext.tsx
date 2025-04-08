import React, { createContext, useContext, useState } from 'react';

interface Car {
  id: number;
  name: string;
  color: string;
}

interface CarContextProps {
  selectedCar: Car | null;
  setSelectedCar: (car: Car) => void;
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <CarContext.Provider value={{ selectedCar, setSelectedCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = (): CarContextProps => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};