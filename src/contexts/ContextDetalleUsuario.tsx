import { Descuento } from "../components/Tables/Columns/DescuentoColumns.tsx";
import React, { createContext, useContext, useState, ReactNode, FC, ReactElement } from "react";
import InformacionGeneralForm from "../components/Forms/InformacionGeneralForm.tsx";
interface StateContextType {
    pantalla: ReactElement | null;
    setPantalla: (pantalla: ReactElement | null) => void;
    click: boolean;
    setClick: (click: boolean) => void;
}


// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    pantalla: null,
    setPantalla: () => { },
    click: false,
    setClick: () => {},
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [pantalla, setPantalla] = useState<ReactElement | null>(<InformacionGeneralForm/>);
    const [click, setClick] = useState<boolean>(false);

    return (
        <StateContext.Provider value={{
            pantalla,
            setPantalla, 
            click,
            setClick
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);
