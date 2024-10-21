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
const ModalEstasSeguroCancelarOTSSS = ({ isOpen, setIsOpen, method }) => {

    const { toast } = useToast()
    const {
        loadingTable,
        setLoadingTable
    } = zustandOrdenTrabajoStore();
    const { arregloCrearOrdenesDeTrabajo, setDataOrdenesDeTrabajoHistorialToma, informacionCerrarOtMasivamente,setLoadingTableFiltrarOrdenDeTrabajoMasivas,setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo} = ZustandFiltrosOrdenTrabajo();


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



console.log(informacionCerrarOtMasivamente);
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


const cancelarMasivamente = async () => {

    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);

    const ids = informacionCerrarOtMasivamente.map(item => item.id);

    // Construye el objeto con la estructura deseada
    const values = {
        ordenes_trabajo: {
            id: ids
        }
    };

    console.log(values);

    try {
      const response = await axiosClient.post("OrdenTrabajo/log_delete/masiva", values);
      console.log(response.data);  
      setIsOpen(false);
      getOrdenDeTrabajoMonitor();
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      toast({
        title: "¡Éxito!",
        description: "Se han cancelado masivamente",
        variant: "success",

    })
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

                   ¿Estás seguro de que deseas cancelar las ordenes de trabajo seleccionadas?
    

                    </AlertDialogTitle>

                    <AlertDialogDescription>
                    Se van a cancelar las ordenes de trabajo seleccionadas.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>


                    <AlertDialogAction onClick={cancelarMasivamente}>
                        Aceptar
                    </AlertDialogAction>


                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalEstasSeguroCancelarOTSSS;
