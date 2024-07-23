import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Colonia } from "../components/Tables/Columns/Colonia-Columns/ColoniaColums.tsx";
import { ColoniaCalleDetalle } from "../components/Tables/Columns/Colonia-Columns/ColoniaCalleColumns.tsx";
import { tipoColoniaId } from "../components/Tables/Columns/ColoniaCalleDetalleColumns.tsx";
// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    colonia: Colonia;
    calles: ColoniaCalleDetalle;
    setCalles: (servicios:ColoniaCalleDetalle) => void;
    accion: string;
    setColonia: (colonia: Colonia) => void;
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
    colonias: Colonia[];
    loadingTable: boolean;
    setColonias : (colonias: Colonia[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
    tipoColonia: tipoColoniaId;
    setTipoColonias: (tipoColonias: tipoColoniaId[]) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    colonia: {} as Colonia,
    calles: {} as ColoniaCalleDetalle,
    setColonia: () => {},
    setCalles: () => {},
    colonias: [],
    activeTab: "Colonia",
    setActiveTab: () => {},
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setColonias: () => {},
    setLoadingTable: () => {},
    tipoColonias: [],
    setTipoColonias: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [colonia, setColonia] = useState<Colonia>({} as Colonia);
    const [calles, setCalles] = useState<ColoniaCalleDetalle>({} as ColoniaCalleDetalle);
    const [colonias, setColonias] = useState<Colonia[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("");
    const [tipoColonias, setTipoColonias] = useState<tipoColoniaId[]>([]);


    return (
        <StateContext.Provider value={{
            colonia,
            setColonia,
            calles,
            setCalles,
            colonias,
            setColonias,
            activeTab,
            setActiveTab,
            loadingTable,
            setLoadingTable,
            accion,
            setAccion,
            tipoColonias,
            setTipoColonias,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);