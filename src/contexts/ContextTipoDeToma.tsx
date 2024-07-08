import { createContext, useContext, useState, ReactNode, FC } from "react";
import { TipoDeToma } from "../components/Tables/Columns/TipoDeTomaColumns.tsx";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    TipoDeToma: TipoDeToma;
    accion: string;
    setTipoDeToma: (tipodetoma: TipoDeToma) => void;
    tipodetomas: TipoDeToma[];
    loadingTable: boolean;
    setTipoDeTomas: (tipodetomas: TipoDeToma[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    TipoDeToma: {} as TipoDeToma,
    setTipoDeToma: () => {},
    tipodetomas: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setTipoDeTomas: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [TipoDeToma, setTipoDeToma] = useState<TipoDeToma>({} as TipoDeToma);
    const [tipodetomas, setTipoDeTomas] = useState<TipoDeToma[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            TipoDeToma,
            setTipoDeToma,
            tipodetomas,
            setTipoDeTomas,
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
