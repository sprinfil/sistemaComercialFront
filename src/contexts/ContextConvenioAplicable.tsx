import { createContext, useContext, useState, ReactNode, FC } from "react";
import { ConvenioAplicable } from "../components/Tables/Columns/ConvenioAplicableColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    convenioAplicable: ConvenioAplicable;
    accion: string;
    setConvenioAplicable: (conceptoAplicable: ConvenioAplicable) => void;
    conveniosAplicables: ConvenioAplicable[];
    loadingTable: boolean;
    setConveniosAplicables: (conveniosAplicables: ConvenioAplicable[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    convenioAplicable: {} as ConvenioAplicable,
    setConvenioAplicable: () => {},
    conveniosAplicables: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setConveniosAplicables: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [convenioAplicable, setConvenioAplicable] = useState<ConvenioAplicable>({} as ConvenioAplicable);
    const [conveniosAplicables, setConveniosAplicables] = useState<ConvenioAplicable[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            convenioAplicable,
            setConvenioAplicable,
            conveniosAplicables,
            setConveniosAplicables,
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
