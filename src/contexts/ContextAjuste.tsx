import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Ajuste } from "../components/Tables/Columns/AjusteColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    ajuste: Ajuste;
    accion: string;
    setAjuste: (ajuste: Ajuste) => void;
    ajustes: Ajuste[];
    loadingTable: boolean;
    setAjustes: (ajustes: Ajuste[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    ajuste: {} as Ajuste,
    setAjuste: () => {},
    ajustes: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setAjustes: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [ajuste, setAjuste] = useState<Ajuste>({} as Ajuste);
    const [ajustes, setAjustes] = useState<Ajuste[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            ajuste,
            setAjuste,
            ajustes,
            setAjustes,
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