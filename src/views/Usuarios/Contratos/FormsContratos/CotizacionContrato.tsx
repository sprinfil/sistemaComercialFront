import React, { useEffect, useState } from 'react'
import axiosClient from '../../../../axios-client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export const CotizacionContrato = ({selected_contrato}) => {




    useEffect(() => {
        MostrarInformacionCotizacion();
    }, [selected_contrato]); 

    const [informacionCotizacion, setInformacionCotizacion] = useState([]);

    const MostrarInformacionCotizacion = async () => {
        const values = {
            contrato: {
               id: selected_contrato.id
            }
        };
        console.log(values);
      
        
        try {
            const response = await axiosClient.get("contratos/cotizacion/show", {
                params: values
            });
            console.log(response.data.cotizacion.cotizaciones_detalles);
           // Convertir la respuesta a un array si no lo es
      const cotizacionData = response.data.cotizacion.cotizaciones_detalles;

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


  return (
    <div>
        <div>
       
        </div>
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Concepto</TableHead>
                <TableHead>Monto</TableHead>
              
                </TableRow>
            </TableHeader>
            <TableBody>
                {informacionCotizacion.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id_concepto}</TableCell>
                  
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                
            </TableFooter>
            </Table>
    </div>
  )
}
