import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Medidor } from "../components/Tables/Columns/Medidor-Columns/MedidorColumns.tsx";
// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    medidor: Medidor;
    accion: string;
    setMedidor: (medidor: Medidor) => void;
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
    medidores: Medidor[];
    loadingTable: boolean;
    setMedidores: (medidores: Medidor[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    medidor: {} as Medidor,
    setMedidor: () => {},
    medidores: [],
    activeTab: "Medidor",
    setActiveTab: () => {},
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setMedidores: () => {},
    setLoadingTable: () => {},
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [medidor, setMedidor] = useState<Medidor>({} as Medidor);
    const [medidores, setMedidores] = useState<Medidor[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("");


    return (
        <StateContext.Provider value={{
            medidor,
            setMedidor,
            medidores,
            setMedidores,
            activeTab,
            setActiveTab,
            loadingTable,
            setLoadingTable,
            accion,
            setAccion,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);
