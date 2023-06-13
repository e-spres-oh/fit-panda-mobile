import React, { createContext, useState } from 'react';
import { UserProfile } from '../types';

type StoreContextType = {
  user: UserProfile | null;
  authToken: string | null;
  setUser: (user: UserProfile) => void;
  setAuthToken: (authToken: string | null) => void;
};
export const UserStoreContext = createContext<StoreContextType>({
  user: null,
  authToken: null,
  setUser: () => {},
  setAuthToken: () => null,
});

export const UserStoreProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  return (
    <UserStoreContext.Provider value={{ user, authToken, setUser, setAuthToken }}>
      {children}
    </UserStoreContext.Provider>
  );
};
