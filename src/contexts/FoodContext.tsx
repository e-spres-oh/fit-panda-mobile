import React, { createContext, useState } from 'react';
import { Food } from '../types';

type StoreContextType = {
  foods: Array<Food>;
  selectedDate: Date;
  setFoods: (foods: Array<Food>) => void;
  selectDate: (date: Date) => void;
};
export const FoodStoreContext = createContext<StoreContextType>({
  foods: [],
  selectedDate: new Date(),
  selectDate: (date) => {},
  setFoods: (foods) => [],
});

export const FoodStoreProvider = ({ children }: { children: JSX.Element }) => {
  const [foods, setFoods] = useState<Array<Food>>([]);
  const [selectedDate, selectDate] = useState<Date>(new Date());
  return (
    <FoodStoreContext.Provider value={{ foods, setFoods, selectDate, selectedDate }}>
      {children}
    </FoodStoreContext.Provider>
  );
};
