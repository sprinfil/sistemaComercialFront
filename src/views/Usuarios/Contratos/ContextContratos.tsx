import { createContext, useContext, useState, ReactNode, FC } from "react";
import { ContratoBuscarUsuario } from "./Columns/ContratoConsultaUsuarioColumns";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    operador: ContratoBuscarUsuario;
    accion: string;
    nombreBuscado: string;
    setNombreBuscado: (nombreBuscado:string) => void;
    setOperador: (operador: ContratoBuscarUsuario) => void;
    usuariosEncontrados: ContratoBuscarUsuario[];
    loadingTable: boolean;
    setusuariosEncontrados: (usuariosEncontrados: ContratoBuscarUsuario[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
    editando: boolean;
    setEditando: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    operador: {} as ContratoBuscarUsuario,
    setOperador: () => {},
    usuariosEncontrados: [],
    loadingTable: false,
    accion: "",
    nombreBuscado: "",
    setNombreBuscado: () => {},
    setAccion: () => {},
    setusuariosEncontrados: () => {},
    setLoadingTable: () => {},
    editando: false,
    setEditando: () => {},
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [operador, setOperador] = useState<ContratoBuscarUsuario>({} as ContratoBuscarUsuario);
    const [usuariosEncontrados, setusuariosEncontrados] = useState<ContratoBuscarUsuario[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");
    const [nombreBuscado, setNombreBuscado] = useState<string>("");
    const [editando, setEditando] = useState<boolean>(false);

    return (
        <StateContext.Provider value={{
            operador,
            setOperador,
            usuariosEncontrados,
            setusuariosEncontrados,
            loadingTable,
            setLoadingTable,
            accion,
            setAccion,
            editando,
            setEditando,
            nombreBuscado,
            setNombreBuscado,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);