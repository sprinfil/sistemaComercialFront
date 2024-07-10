import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Rol } from "../components/Tables/Columns/RolColumns";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    rol: Rol;
    accion: string;
    setRol: (rol: Rol) => void;
    roles: Rol[];
    loadingTable: boolean;
    setRoles: (rol: Rol[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
    permissions: string[];
    setPermissions: (permissions: string[]) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    rol: {} as Rol,
    setRol: () => {},
    roles: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setRoles: () => {},
    setLoadingTable: () => {},
    permissions: [],
    setPermissions: () => { },
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [rol, setRol] = useState<Rol>({} as Rol);
    const [roles, setRoles] = useState<Rol[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");
    const [permissions, setPermissions] = useState<string[]>([]);

    return (
        <StateContext.Provider value={{
            rol,
            setRol,
            roles,
            setRoles,
            loadingTable,
            setLoadingTable,
            accion,
            setAccion,
            permissions,
            setPermissions
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);