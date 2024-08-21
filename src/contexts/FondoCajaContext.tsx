// contexts/FondoCajaContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface FondoCajaContextProps {
    fondoCaja: number | null;
    registrarFondoCaja: (monto: number) => void;
    reiniciarFondoCaja: () => void;
}

const FondoCajaContext = createContext<FondoCajaContextProps | undefined>(undefined);

export const FondoCajaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fondoCaja, setFondoCaja] = useState<number | null>(null);

    const registrarFondoCaja = (monto: number) => {
        if (fondoCaja === null) {
            setFondoCaja(monto);
        } else {
            console.warn('Ya hay un fondo de caja registrado.');
        }
    };

    const reiniciarFondoCaja = () => {
        setFondoCaja(null);
    };

    return (
        <FondoCajaContext.Provider value={{ fondoCaja, registrarFondoCaja, reiniciarFondoCaja }}>
            {children}
        </FondoCajaContext.Provider>
    );
};

export const useFondoCaja = () => {
    const context = useContext(FondoCajaContext);
    if (context === undefined) {
        throw new Error('useFondoCaja must be used within a FondoCajaProvider');
    }
    return context;
};

