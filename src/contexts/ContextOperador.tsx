import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Operador } from "../components/Tables/Columns/OperadorColumns";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    operador: Operador;
    accion: string;
    setOperador: (operador: Operador) => void;
    operadores: Operador[];
    loadingTable: boolean;
    setOperadores: (operador: Operador[]) => void;
    setAccion: (accion: string) => void;
    setLoadingTable: (loading: boolean) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    operador: {} as Operador,
    setOperador: () => {},
    operadores: [],
    loadingTable: false,
    accion: "",
    setAccion: () => {},
    setOperadores: () => {},
    setLoadingTable: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [operador, setOperador] = useState<Operador>({} as Operador);
    const [operadores, setOperadores] = useState<Operador[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [accion, setAccion] = useState<string>("");

    return (
        <StateContext.Provider value={{
            operador,
            setOperador,
            operadores,
            setOperadores,
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