import { createContext, useContext, useState, ReactNode, FC } from "react";
import { OrdenDeTrabajo } from "../components/Tables/Columns/OrdenDeTrabajoColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    ordenDeTrabajo: OrdenDeTrabajo;
    accion: string;
    setOrdenDeTrabajo: (ordenDeTrabajo: OrdenDeTrabajo) => void;
    ordenDeTrabajos: OrdenDeTrabajo[];
    loadingTable: boolean;
    setOrdenDeTrabajos: (tipodetomas: OrdenDeTrabajo[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    ordenDeTrabajo: {} as OrdenDeTrabajo,
    setOrdenDeTrabajo: () => {},
    ordenDeTrabajos: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setOrdenDeTrabajos: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [ordenDeTrabajo, setOrdenDeTrabajo] = useState<OrdenDeTrabajo>({} as OrdenDeTrabajo);
    const [ordenDeTrabajos, setOrdenDeTrabajos] = useState<OrdenDeTrabajo[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            ordenDeTrabajo,
            setOrdenDeTrabajo,
            ordenDeTrabajos,
            setOrdenDeTrabajos,
            loadingTable,
            setLoadingTable,
            accion,
            setAccion
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);
