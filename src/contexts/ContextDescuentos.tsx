import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Descuento } from "../components/Tables/Columns/DescuentoColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    descuento: Descuento;
    accion: string;
    setDescuento: (descuento: Descuento) => void;
    descuentos: Descuento[];
    loadingTable: boolean;
    setDescuentos: (descuentos: Descuento[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    descuento: {} as Descuento,
    setDescuento: () => {},
    descuentos: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setDescuentos: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [descuento, setDescuento] = useState<Descuento>({} as Descuento);
    const [descuentos, setDescuentos] = useState<Descuento[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            descuento,
            setDescuento,
            descuentos,
            setDescuentos,
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
