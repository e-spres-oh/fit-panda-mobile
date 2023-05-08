import React, { createContext, useState } from 'react';

type AppContextType = {
  useHomeRoute: boolean;
  setUseHomeRoute: (value: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  useHomeRoute: false,
  setUseHomeRoute: () => {},
});

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [useHomeRoute, setUseHomeRoute] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ useHomeRoute, setUseHomeRoute }}>
      {children}
    </AppContext.Provider>
  );
};
