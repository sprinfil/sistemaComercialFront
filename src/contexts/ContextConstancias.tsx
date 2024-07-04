import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Constancia } from "../components/Tables/Columns/ConstanciaColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    constancia: Constancia;
    accion: string;
    setConstancia: (constancia: Constancia) => void;
    constancias: Constancia[];
    loadingTable: boolean;
    setConstancias: (constancias: Constancia[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    constancia: {} as Constancia,
    setConstancia: () => {},
    constancias: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setConstancias: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [constancia, setConstancia] = useState<Constancia>({} as Constancia);
    const [constancias, setConstancias] = useState<Constancia[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            constancia,
            setConstancia,
            constancias,
            setConstancias,
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
