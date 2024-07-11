import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Tarifa } from "../components/Tables/Columns/Tarifa-Columns/TarifaServicioColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    tarifa: Tarifa;
    accion: string;
    setTarifa: (tarifa: Tarifa) => void;
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
    tarifas: Tarifa[];
    loadingTable: boolean;
    setTarifas: (tarifas: Tarifa[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    tarifa: {} as Tarifa,
    setTarifa: () => {},
    tarifas: [],
    activeTab: "Tarifa",
    setActiveTab: () => {},
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setTarifas: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [tarifa, setTarifa] = useState<Tarifa>({} as Tarifa);
    const [tarifas, setTarifas] = useState<Tarifa[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("");


    return (
        <StateContext.Provider value={{
            tarifa,
            setTarifa,
            tarifas,
            setTarifas,
            activeTab,
            setActiveTab,
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
