import { createContext, useContext, useState, ReactNode, FC } from "react";
import { GiroComercial } from "../components/Tables/Columns/GiroComercialColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    girocomercial: GiroComercial;
    accion: string;
    setGiroComercial: (girocomercial: GiroComercial) => void;
    giroscomerciales: GiroComercial[];
    loadingTable: boolean;
    setGirosComerciales: (giroscomerciales: GiroComercial[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    girocomercial: {} as GiroComercial,
    setGiroComercial: () => {},
    giroscomerciales: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setGirosComerciales: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [girocomercial, setGiroComercial] = useState<GiroComercial>({} as GiroComercial);
    const [giroscomerciales, setGirosComerciales] = useState<GiroComercial[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            girocomercial,
            setGiroComercial,
            giroscomerciales,
            setGirosComerciales,
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
