import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Caja } from "../components/Tables/Columns/CajaColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    caja: Caja;
    accion: string;
    setCaja: (caja: Caja) => void;
    cajas: Caja[];
    loadingTable: boolean;
    setCajas: (cajas: Caja[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    caja: {} as Caja,
    setCaja: () => {},
    cajas: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setCajas: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [caja, setCaja] = useState<Caja>({} as Caja);
    const [cajas, setCajas] = useState<Caja[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            caja,
            setCaja,
            cajas,
            setCajas,
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