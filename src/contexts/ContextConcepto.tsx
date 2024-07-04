import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Concepto } from "../components/Tables/Columns/ConceptosColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    concepto: Concepto;
    accion: string;
    setConcepto: (concepto: Concepto) => void;
    conceptos: Concepto[];
    loadingTable: boolean;
    setConceptos: (conceptos: Concepto[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    concepto: {} as Concepto,
    setConcepto: () => {},
    conceptos: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setConceptos: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [concepto, setConcepto] = useState<Concepto>({} as Concepto);
    const [conceptos, setConceptos] = useState<Concepto[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            concepto,
            setConcepto,
            conceptos,
            setConceptos,
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
