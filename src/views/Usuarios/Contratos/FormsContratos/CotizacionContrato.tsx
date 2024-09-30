import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios-client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import IconButton from '../../../../components/ui/IconButton';
import { Trash2Icon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const CotizacionContrato = ({ selected_contrato }) => {
    const { toast } = useToast();
    const [numCotizacion, setNumCotizacion] = useState();
    const [informacionCotizacion, setInformacionCotizacion] = useState([]);

    useEffect(() => {
        MostrarInformacionCotizacion();
    }, [selected_contrato]);

    const MostrarInformacionCotizacion = async () => {
        const values = { contrato: { id: selected_contrato.id } };
        
        try {
            const response = await axiosClient.get("contratos/cotizacion/show", { params: values });
            const cotizacionData = response.data.cotizacion;
            setNumCotizacion(response?.data?.id_cotizacion);

            if (Array.isArray(cotizacionData)) {
                setInformacionCotizacion(cotizacionData);
            } else if (cotizacionData) {
                setInformacionCotizacion([cotizacionData]);
            } else {
                setInformacionCotizacion([]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const EliminarCotizacion = async () => {

        setInformacionCotizacion([]);
        try {
            const response = await axiosClient.delete(`contratos/cotizacion/log_delete/${numCotizacion}`);
            console.log(response);

           

            toast({
                title: "¡Éxito!",
                description: "Se ha eliminado la cotización correctamente",
                variant: "success",
            });
        } catch (err) {
            console.log(err);
            toast({
                variant: "destructive",
                title: "Oh, no. Error",
                description: "Algo salió mal.",
                action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
            });
        }
      
    };

    return (
        <div className='w-full'>
            <div className='flex justify-end w-[5vh] ml-[204vh]'>
                <IconButton onClick={EliminarCotizacion}><Trash2Icon /></IconButton>
            </div>
            <div className="flex justify-center w-full">
                <Table className="w-full max-h-[50vh]">
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-full text-xl">Concepto</TableHead>
                            <TableHead className="w-full text-xl">Monto</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {informacionCotizacion.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium text-lg w-full">{item?.concepto?.nombre}</TableCell>
                                <TableCell className="font-medium text-lg w-full">{item?.monto}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2} className="text-xl">Total</TableCell>
                            <TableCell className="text-xl"> ${informacionCotizacion.reduce((acc, item) => acc + parseFloat(item.monto), 0).toFixed(2)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};
