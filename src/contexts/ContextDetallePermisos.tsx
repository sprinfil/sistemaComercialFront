import { Descuento } from "../components/Tables/Columns/DescuentoColumns.tsx";
import React, { createContext, useContext, useState, ReactNode, FC, ReactElement } from "react";

interface StateContextType {
    pantalla: ReactElement | null;
    setPantalla: (pantalla: ReactElement | null) => void;
}


// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    pantalla: null,
    setPantalla: () => { },
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProviderPermisos: FC<ContextProviderProps> = ({ children }) => {
    const [pantalla, setPantalla] = useState<ReactElement | null>(null);

    return (
        <StateContext.Provider value={{
            pantalla,
            setPantalla
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContextPermisos = () => useContext(StateContext);
