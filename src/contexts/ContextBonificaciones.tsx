import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Bonificacion } from "../components/Tables/Columns/BonificacionesColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    bonificacion: Bonificacion;
    accion: string;
    setBonificacion: (bonificacion: Bonificacion) => void;
    bonificaciones: Bonificacion[];
    loadingTable: boolean;
    setBonificaciones: (anomalias: Bonificacion[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    bonificacion: {} as Bonificacion,
    setBonificacion: () => {},
    bonificaciones: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setBonificaciones: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [bonificacion, setBonificacion] = useState<Bonificacion>({} as Bonificacion);
    const [bonificaciones, setBonificaciones] = useState<Bonificacion[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            bonificacion,
            setBonificacion,
            bonificaciones,
            setBonificaciones,
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
