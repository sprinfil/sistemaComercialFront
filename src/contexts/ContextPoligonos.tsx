import { createContext, useContext, useState, ReactNode, FC } from "react";
import axiosClient from "../axios-client";

export type Ruta = {
    id: number
    nombre: string
    color: string
  }

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    ruta: Ruta;
    setRuta: (ruta: Ruta) => void;
    rutas: Ruta[];
    setRutas: (rutas: Ruta[]) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    ruta: {id: 0, nombre: ""},
    setRuta: () => {},
    rutas: [],
    setRutas: () => {},
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [ruta, setRuta] = useState<Ruta>({id:0, nombre:""});
    const [rutas, setRutas] = useState<Ruta[]>([]);

    return (
        <StateContext.Provider value={{
            ruta,
            setRuta,
            rutas,
            setRutas
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);