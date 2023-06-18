import React, { createContext, useState } from 'react';
import { Food } from '../types';

type StoreContextType = {
  foods: Array<Food>;
  selectedDate: Date;
  setFoods: (foods: Array<Food>) => void;
  selectDate: (date: Date) => void;
  showBarCodeScanner: boolean;
  setShowBarCodeScanner: (bool: boolean) => void;
};
export const FoodStoreContext = createContext<StoreContextType>({
  foods: [],
  selectedDate: new Date(),
  selectDate: (date) => {},
  setFoods: (foods) => [],
  showBarCodeScanner: false,
  setShowBarCodeScanner: (bool) => {}
});

export const FoodStoreProvider = ({ children }: { children: JSX.Element }) => {
  const [foods, setFoods] = useState<Array<Food>>([]);
  const [selectedDate, selectDate] = useState<Date>(new Date());
  const [showBarCodeScanner, setShowBarCodeScanner] = useState(false);
  return (
    <FoodStoreContext.Provider value={{ foods, setFoods, selectDate, selectedDate, showBarCodeScanner, setShowBarCodeScanner }}>
      {children}
    </FoodStoreContext.Provider>
  );
};
