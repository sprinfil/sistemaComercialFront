import React, { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import EscogerOrdenDeTrabajoTable from '../Tables/Components/EscogerOrdenDeTrabajoTable';
import axiosClient from '../../axios-client';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt';
import { zustandOrdenTrabajoStore } from '../../contexts/ZustandOrdenesDeTrabajoUsuario';
import IconButton from './IconButton';
import { TrashIcon } from 'lucide-react';
const ModalEstasSeguroCancelarMasivamenteOT = ({ isOpen, setIsOpen, method }) => {

    const { toast } = useToast()
    const {
        loadingTable,
        setLoadingTable
    } = zustandOrdenTrabajoStore();
    const { arregloCrearOrdenesDeTrabajo, setDataOrdenesDeTrabajoHistorialToma, informacionCerrarOtMasivamente, setLoadingTableFiltrarOrdenDeTrabajoMasivas, setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo} = ZustandFiltrosOrdenTrabajo();


    const { usuariosEncontrados, setUsuariosEncontrados, idSeleccionadoGenerarOrdenDETrabajoToma } = ZustandGeneralUsuario();

    // console.log(JSON.stringify(usuariosEncontrados));
    //console.log(idSeleccionadoGenerarOrdenDETrabajoToma);


    const action = () => {
        method();
        setIsOpen(false);
    }

    const [consultaIdToma, setConsultaIdToma] = useState<Usuario | null>(null);
    const [idDeLaTomaParametro, setIdDeLaTomaParametro] = useState(0)

    //SE DECLARA EL OBJETO USUARIO Y TOMAS
    //USUARIO ES UN OBJETO PERO TOMAS ES UN ARRAY DENTRO DEL OBJETO XD
    type Usuario = {
        id: number
        nombre: string
        apellido_paterno: string
        apellido_materno: string
        telefono: string
        correo: string
        curp: string
        tomas?: tomas;
    }

    type tomas = {
        id: number
        codigo_toma: string

    }

    //SETEAMOS CADA QUE SE ENCUENTRE USUARIOS

    useEffect(() => {

        setConsultaIdToma(usuariosEncontrados[0]);

    }, [usuariosEncontrados]);

    const getOrdenDeTrabajoMonitor = async () => {
        setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
        try {
          const response = await axiosClient.get("OrdenTrabajo/NoAsignada");
          setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
          setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo(response.data.data);
          console.log(response);
        } catch (error) {
          setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
          console.error("Failed to fetch orden:", error);
        }
      };

console.log(informacionCerrarOtMasivamente);

const cerrarMasivamente = async () => {
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
    const ordenes_trabajo = informacionCerrarOtMasivamente.map((item) => ({
         id: item.id,
         genera_OT_encadenadas:false

      }));

      const dataToSend = {
        ordenes_trabajo: ordenes_trabajo
      };
    
     
    
      console.log('Datos a enviar:', dataToSend);

    console.log(ordenes_trabajo); 

    try {
      const response = await axiosClient.put("OrdenTrabajo/cerrar/masiva", dataToSend);
      console.log(response.data);  
      setIsOpen(false);
      toast({
        title: "¡Éxito!",
        description: "Se han cerrado masivamente",
        variant: "success",

    })
    getOrdenDeTrabajoMonitor();
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
    } 
    catch (response) {
       console.log(response)
       setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
       toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo salió mal.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
    }
  };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-[85vh]">
                <AlertDialogHeader>

                    <AlertDialogTitle>

                   ¿Estas seguro que deseas cerrar las ordenes de trabajo seleccionadas?
    

                    </AlertDialogTitle>

                    <AlertDialogDescription>
                    Se van a cerrar las ordenes de trabajo seleccionadas
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>


                    <AlertDialogAction onClick={cerrarMasivamente}>
                        Aceptar
                    </AlertDialogAction>


                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalEstasSeguroCancelarMasivamenteOT;
