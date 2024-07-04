import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Convenio } from "../components/Tables/Columns/ConvenioColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    convenio: Convenio;
    accion: string;
    setConvenio: (concepto: Convenio) => void;
    convenios: Convenio[];
    loadingTable: boolean;
    setConvenios: (convenios: Convenio[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    convenio: {} as Convenio,
    setConvenio: () => {},
    convenios: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setConvenios: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [convenio, setConvenio] = useState<Convenio>({} as Convenio);
    const [convenios, setConvenios] = useState<Convenio[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            convenio,
            setConvenio,
            convenios,
            setConvenios,
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
