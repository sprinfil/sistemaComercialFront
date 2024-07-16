import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Calle } from "../components/Tables/Columns/CalleColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    calle: Calle;
    accion: string;
    setCalle: (calle: Calle) => void;
    calles: Calle[];
    loadingTable: boolean;
    setCalles: (calles: Calle[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    calle: {} as Calle,
    setCalle: () => {},
    calles: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setCalles: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [calle, setCalle] = useState<Calle>({} as Calle);
    const [calles, setCalles] = useState<Calle[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            calle,
            setCalle,
            calles,
            setCalles,
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