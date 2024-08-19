// contexts/FondoCajaContext.js
import React, { createContext, useContext, useState } from 'react';

const FondoCajaContext = createContext();

export function useFondoCaja() {
  return useContext(FondoCajaContext);
}

export function FondoCajaProvider({ children }) {
  const [isFondoCajaRegistered, setIsFondoCajaRegistered] = useState(false);

  return (
    <FondoCajaContext.Provider value={{ isFondoCajaRegistered, setIsFondoCajaRegistered }}>
      {children}
    </FondoCajaContext.Provider>
  );
}
