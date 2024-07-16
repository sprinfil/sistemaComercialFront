import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Colonia } from "../components/Tables/Columns/ColoniaColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    colonia: Colonia;
    accion: string;
    setColonia: (colonia: Colonia) => void;
    colonias: Colonia[];
    loadingTable: boolean;
    setColonias: (colonias: Colonia[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    colonia: {} as Colonia,
    setColonia: () => {},
    colonias: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setColonias: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [colonia, setColonia] = useState<Colonia>({} as Colonia);
    const [colonias, setColonias] = useState<Colonia[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            colonia,
            setColonia,
            colonias,
            setColonias,
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