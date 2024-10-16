import { createContext, useContext, useState, ReactNode, FC } from "react";
import { CorteCaja } from "../components/Tables/Columns/CorteCajaColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    cortecaja: CorteCaja;
    accion: string;
    setCorteCaja: (cortecaja: CorteCaja) => void;
    cortecajas: CorteCaja[];
    loadingTable: boolean;
    setCorteCajas: (cortecajas: CorteCaja[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    cortecaja: {} as CorteCaja,
    setCorteCaja: () => {},
    cortecajas: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setCorteCajas: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [cortecaja, setCorteCaja] = useState<CorteCaja>({} as CorteCaja);
    const [cortecajas, setCorteCajas] = useState<CorteCaja[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            cortecaja,
            setCorteCaja,
            cortecajas,
            setCorteCajas,
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