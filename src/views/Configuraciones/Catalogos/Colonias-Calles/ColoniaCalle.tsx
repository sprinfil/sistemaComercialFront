import React, { useContext, useState, useEffect } from 'react'
import { ContextProvider } from '../../../../contexts/ContextProvider.tsx'
import { useStateContext } from "../../../../contexts/ContextColonia.tsx";
import { Button } from '../../../../components/ui/button.tsx';
import axiosClient from '../../../../axios-client.ts';
import ColoniaCalleNewTable from '../../../../components/Tables/Components/ColoniaCalleNewTable.tsx';
import { Card, CardContent } from "@/components/ui/card"
import Loader from '../../../../components/ui/Loader.tsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const ColoniaCalle = () => {

  const { colonia, setColonias, loadingTable, setLoadingTable, setAccion, setColonia, tipoColonia, setTipoColonias } = useStateContext();
const [loading, setLoading] = useState(false);

useEffect(() => { getTipoColonias(); }, []);
useEffect(() => { getTipoColonias(); }, [colonia]);

//con este metodo obtienes las tipo de tomas de la bd
const getTipoColonias = async () => {
    setLoading(true);
    try {
        const response = await axiosClient.get("/colonia");
        setLoading(false);
        setLoadingTable(false);
        setTipoColonias(response.data.data);
        console.log(response.data);
    } catch (error) {
        setLoadingTable(false);
        console.error("Failed to fetch colonias:", error);
    }
};

if (loading) {
    return <div><Loader /></div>;
}

return (
    <div className=' w-full  flex justify-center'>
        <ContextProvider>
            <Accordion type="single" collapsible className="w-full">
                {(tipoColonia ?? []).map((tipoColonia, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{tipoColonia.nombre}</AccordionTrigger>
                        <AccordionContent>
                            <ColoniaCalleNewTable tipoToma={tipoColonia.id} tarifa={colonia} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </ContextProvider>
    </div>
);

}
