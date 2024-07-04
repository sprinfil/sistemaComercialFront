import { createContext, useContext, useState, ReactNode, FC } from "react";
import axiosClient from "../axios-client";
// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    user: object;
    token: string | null;
    setUser: (user: object) => void;
    setToken: (token: string | null) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    user: {},
    token: null,
    setUser: () => {},
    setToken: () => {},
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<object>({});
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

    // Función para manejar la actualización del token y gestionar localStorage
    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);