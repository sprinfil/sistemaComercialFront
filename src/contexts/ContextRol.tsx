import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Rol } from "../components/Tables/Columns/RolColumns";
import { Operador } from "../components/Tables/Columns/OperadorColumns";

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
    editando: boolean;
    setEditando: (loading: boolean) => void;
    operador: Operador;
    setOperador: (rol: Operador) => void;
    permissionsOperador: string[];
    setPermissionsOperador: (permissionsOperador: string[]) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    rol: {} as Rol,
    setRol: () => {},
    roles: [],
    loadingTable: false,
    editando: false,
    accion: "",
    setAccion: () => {},
    setRoles: () => {},
    setLoadingTable: () => {},
    setEditando: () => {},
    permissions: [],
    setPermissions: () => { },
    operador: {} as Operador,
    setOperador: () => {},
    permissionsOperador: [],
    setPermissionsOperador: () => {},
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
    const [editando, setEditando] = useState<boolean>(false);

    const [operador, setOperador] = useState<Operador>({} as Operador);
    const [permissionsOperador, setPermissionsOperador] = useState<string[]>([]);

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
            setPermissions, 
            editando,
            setEditando,
            operador,
            setOperador,
            permissionsOperador,
            setPermissionsOperador
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);