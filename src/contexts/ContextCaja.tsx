import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Caja } from "../components/Tables/Columns/CajaColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    anomalia: Caja;
    accion: string;
    setAnomalia: (anomalia: Caja) => void;
    anomalias: Caja[];
    loadingTable: boolean;
    setAnomalias: (anomalias: Caja[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    anomalia: {} as Caja,
    setAnomalia: () => {},
    anomalias: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setAnomalias: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [anomalia, setAnomalia] = useState<Caja>({} as Caja);
    const [anomalias, setAnomalias] = useState<Caja[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            anomalia,
            setAnomalia,
            anomalias,
            setAnomalias,
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