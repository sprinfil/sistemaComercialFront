import React, { createContext, useContext, useState, ReactNode, FC, ReactElement, useEffect } from "react";

// Define the state context type to include the new permissions state and setPermissions function
interface StateContextType {
    pantalla: ReactElement | null;
    setPantalla: (pantalla: ReactElement | null) => void;
    click: boolean;
    setClick: (click: boolean) => void;
}

// Create the context with default values
const StateContext = createContext<StateContextType>({
    pantalla: null,
    click: false,
    setClick: () => {},
    setPantalla: () => {},
});

// Define the provider component that wraps children with the context provider
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProviderPermisos: FC<ContextProviderProps> = ({ children }) => {
    const [pantalla, setPantalla] = useState<ReactElement | null>(null);
    const [click, setClick] = useState<boolean>(false);

    return (
        <StateContext.Provider value={{
            pantalla,
            setPantalla,
            click,
            setClick
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the context easily
export const useStateContextPermisos = () => useContext(StateContext);
