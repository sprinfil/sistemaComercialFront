import React, { createContext, useContext, useState, ReactNode, FC, ReactElement, useEffect } from "react";

// Define the state context type to include the new permissions state and setPermissions function
interface StateContextType {
    pantalla: ReactElement | null;
    setPantalla: (pantalla: ReactElement | null) => void;
}

// Create the context with default values
const StateContext = createContext<StateContextType>({
    pantalla: null,
    setPantalla: () => { },
});

// Define the provider component that wraps children with the context provider
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProviderPermisos: FC<ContextProviderProps> = ({ children }) => {
    const [pantalla, setPantalla] = useState<ReactElement | null>(null);

    return (
        <StateContext.Provider value={{
            pantalla,
            setPantalla,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the context easily
export const useStateContextPermisos = () => useContext(StateContext);
