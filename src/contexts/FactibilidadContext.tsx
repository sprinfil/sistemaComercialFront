import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Factibilidad } from "../components/Tables/Columns/FactibilidadColumns"; // Asegúrate de importar correctamente

interface FactibilidadContextType {
    factibilidades: Factibilidad[];
    setFactibilidades: (factibilidades: Factibilidad[]) => void;
    loadingTable: boolean;
    setLoadingTable: (loading: boolean) => void;
    filter: any;
    setFilter: (filter: any) => void;
}

const FactibilidadContext = createContext<FactibilidadContextType>({
    factibilidades: [],
    setFactibilidades: () => {},
    loadingTable: false,
    setLoadingTable: () => {},
    filter: {},
    setFilter: () => {},
});

interface FactibilidadProviderProps {
    children: ReactNode;
}

export const FactibilidadProvider: FC<FactibilidadProviderProps> = ({ children }) => {
    const [factibilidades, setFactibilidades] = useState<Factibilidad[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [filter, setFilter] = useState<any>({});

    return (
        <FactibilidadContext.Provider value={{ factibilidades, setFactibilidades, loadingTable, setLoadingTable, filter, setFilter }}>
            {children}
        </FactibilidadContext.Provider>
    );
};

export const useFactibilidadContext = () => useContext(FactibilidadContext);
