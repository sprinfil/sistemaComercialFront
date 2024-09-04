import { createContext, useContext, useState, ReactNode, FC } from "react";
import { AsignarOrdenDeTrabajo } from "../components/Tables/Columns/AsignarOrdenDeTrabajoColumns.tsx";
// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    anomalia: AsignarOrdenDeTrabajo;
    accion: string;
    setAnomalia: (anomalia: AsignarOrdenDeTrabajo) => void;
    anomalias: AsignarOrdenDeTrabajo[];
    loadingTable: boolean;
    setAnomalias: (anomalias: AsignarOrdenDeTrabajo[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    anomalia: {} as AsignarOrdenDeTrabajo,
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
    const [anomalia, setAnomalia] = useState<AsignarOrdenDeTrabajo>({} as AsignarOrdenDeTrabajo);
    const [anomalias, setAnomalias] = useState<AsignarOrdenDeTrabajo[]>([]);
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