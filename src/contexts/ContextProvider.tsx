import { createContext, useContext, useState, ReactNode, FC } from "react";
import axiosClient from "../axios-client";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    user: object;
    token: string | null;
    setUser: (user: object) => void;
    setToken: (token: string | null) => void;
    permissions: string[];
    setPermissions: (permissions: string[]) => void;
    server_status: boolean;
    setServerStatus: (status: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    user: {},
    token: null,
    setUser: () => {},
    setToken: () => {},
    permissions: [],
    setPermissions: () => {},
    server_status: false,
    setServerStatus: () => {},
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<object>({});
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));
    const [permissions, setPermissions] = useState<string[]>([]);
    const [server_status, setServerStatus] = useState<boolean>(true);

    // Función para manejar la actualización del token y gestionar localStorage
    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    // Obtener los permisos del usuario
    const getPermissions = async () => {
        try {
            const response = await axiosClient.get(`/Rol/get_all_permissions_by_rol_id/${rol.id}`);
            setPermissions(response.data);
        } catch (error) {
            console.error("Failed to fetch permissions:", error);
        }
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            permissions,
            setPermissions,
            server_status,
            setServerStatus,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);
