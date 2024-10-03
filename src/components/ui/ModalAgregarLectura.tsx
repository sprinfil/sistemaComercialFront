import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import EscogerOrdenDeTrabajoTable from "../Tables/Components/EscogerOrdenDeTrabajoTable";
import axiosClient from "../../axios-client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { OperadoresOtIndividualComboBox } from "./OperadoresOtIndividualComboBox.tsx";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cambioPropietarioSchema } from "../Forms/validaciones.ts";
import { z } from "zod";
import { Button } from "./button.tsx";
import AsignarOrdenDeTrabajoTable from "../Tables/Components/AsignarOrdenDeTrabajoTable.tsx";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt.tsx";
import AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable from "../Tables/Components/AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable.tsx";
import { MdDeleteOutline } from "react-icons/md";
import IconButton from "./IconButton.tsx";
import { FaUserEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import MarcoForm from "./MarcoForm.tsx";
import MarcoFormModalContratoMonitor from "./MarcoFormModalContratoMonitor.tsx";
import { ZustandFiltrosContratacion } from "../../contexts/ZustandFiltrosContratacion.tsx";
import { UsuariosComboBox } from "./UsuariosComboBox.tsx";
import { BuscarUsuarioForm } from "../../views/Usuarios/Contratos/FormsContratos/BuscarUsuarioForm.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { Input } from "./input.tsx";
import { ConceptosComboBox } from "./ConceptosComboBox.tsx";
import { ConceptosComboBoxCotizacion } from "./ConceptosComboBoxCotizacion.tsx";
import ComboBoxCargosCargables from "./ComboBoxCargosCargables.tsx";
import { ComboBoxAnomalia } from "./ComboBoxAnomalia.tsx";
import { RiUserSearchFill } from "react-icons/ri";
import { ComboBoxPeriodoFacturacion } from "./ComboBoxPeriodoFacturacion.tsx";
import lecturasService from "../../lib/LecturaService.ts";
import ZustandMonitorLectura from "../../contexts/ZustandMonitorLectura.tsx";
const ModalAgregarLectura = ({open, setOpen }) => {
  const { toast } = useToast();
  const [selected_conceptos, set_selected_conceptos] = useState();
  const [selected_periodo, set_selected_periodo] = useState();
  const [comentarioValue, setComentarioValue] = useState('');
  const [lecturaValue, setLecturaValue] = useState('');
  const [seleccionarAnomalia, setSeleccionarAnomalia] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const {usuariosEncontrados, buscarTomaAgregarLecturaMonitor, setBuscarTomaAgregarLecturaMonitor, setAgregarPeriodoFacturacion, 
    agregarPeriodoFacturacion, agregarAnomalia, setAgregarAnomalia} = ZustandGeneralUsuario();
    const { set_lecturas, lecturas } = ZustandMonitorLectura();
    const [loadingLecturas, setLoadingLecturas] = useState(false);
    const [lecturas_temp, set_lecturas_temp] = useState([]);

    const fetchFact = async () => {
      setLoadingLecturas(true);
      let lecturasTemp = await lecturasService.get_all();
      setLoadingLecturas(false);
      set_lecturas(lecturasTemp);
    };

    useEffect(() => {
      set_lecturas_temp(lecturas)
    }, [lecturas])

  const handleGuardarLectura = () => {

    const values = {
        id_operador:1,
        id_toma: usuariosEncontrados[0]?.tomas[0]?.id,
        id_periodo: agregarPeriodoFacturacion[0]?.id, 
        id_origen: 1, //DEFECTO 0
        modelo_origen: "toma", // MANDAR VACIO
        id_anomalia: agregarAnomalia[0]?.id,  //SI HAY ANOMALÍA NO MANDAR LECTURA
        lectura: lecturaValue, 
        comentario: comentarioValue //OPCIONAL
    }

    console.log(values);
    try{
      const response = axiosClient.post('/lectura/store', values)
      console.log(response);
      toast({
        title: "¡Éxito!",
        description: "La acción se ha realizado correctamente.",
        variant: "success",

    })
    fetchFact();
    setOpen(false);

    }
    catch(response)
    {
      console.log(response);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo salió mal.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
    }
  }

  
  useEffect(() => {
    console.log( buscarTomaAgregarLecturaMonitor);
  }, [buscarTomaAgregarLecturaMonitor]);


  const handleSeleccionarAnomalia = () => 
    {
      if(seleccionarAnomalia){
        setSeleccionarAnomalia(false);
  
      }
      else
      {
        setSeleccionarAnomalia(true);
  
      }
    }


    const handleCambiarUsuario = () => {
    console.log("Cambiando a buscar otro usuario. Valor anterior:", buscarTomaAgregarLecturaMonitor);
    setBuscarTomaAgregarLecturaMonitor(false);
    setMostrarForm(true);
  };

    console.log(buscarTomaAgregarLecturaMonitor);
    console.log(mostrarForm);

    console.log(agregarPeriodoFacturacion[0]?.id);

    
  return (

<AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
      {
            !buscarTomaAgregarLecturaMonitor  ? 
            <>
              <BuscarUsuarioForm/>
            <AlertDialogAction className="mt-10">Cerrar</AlertDialogAction>
          
            
            </>
          
            :
<>
<AlertDialogHeader>
         
         
         <AlertDialogTitle>Agregar lectura
          
        <div className="flex justify-end">
        <div className="w-[4vh]">
          <IconButton  onClick={handleCambiarUsuario}>
          <RiUserSearchFill className="w-[3vh]" />

          </IconButton>
         
          </div>
        </div>

         </AlertDialogTitle>
         <AlertDialogDescription> 
         <div className="flex flex-col">
        <div className="text-xl">Nombre del usuario: {usuariosEncontrados[0]?.nombre_completo}</div>
        <span className="text-xl">Toma: {usuariosEncontrados[0]?.tomas[0]?.codigo_toma}</span>
      </div>
                <div className="flex justify-end">
           <div className="w-[20vh] bg-muted rounded-s-lg">
           <IconButton onClick={handleSeleccionarAnomalia}>
             {!seleccionarAnomalia && "Seleccionar anomalía"}
             {seleccionarAnomalia && "Ingresar lectura"}
             </IconButton>
           </div>
           </div>
      {
       !seleccionarAnomalia &&
       <>
        <Input 
       value={lecturaValue} 
       onChange={(e) => setLecturaValue(e.target.value)} 
       placeholder="Ingresa la lectura." 
       className="mt-5"
       type="number"

       />
       <div className="mt-2 ml-2">Ingresa una lectura.</div>

       </>
      
      }

      {
       seleccionarAnomalia &&
       <div className="mt-5">
       <ComboBoxAnomalia selected_conceptos={agregarAnomalia} set={setAgregarAnomalia} />
          <div className="mt-2 ml-2">Selecciona la anomalía</div>
         </div>
      }


      <div className="mt-5">
      <ComboBoxPeriodoFacturacion selected_conceptos={agregarPeriodoFacturacion} set={setAgregarPeriodoFacturacion} />
      <div className="mt-2 ml-2">Selecciona el periodo de facturación</div>

      </div>

       
         <Input 
       value={comentarioValue} 
       onChange={(e) => setComentarioValue(e.target.value)} 
       placeholder="Escribe un comentario." 
       className="mt-5"
       />
             <div className="mt-2 ml-2">Escribe un comentario. (opcional)</div>

         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
       <AlertDialogAction>Cancelar</AlertDialogAction>
       <AlertDialogAction onClick={handleGuardarLectura}>
         {!seleccionarAnomalia && "Ingresar lectura"}
         {seleccionarAnomalia && "Agregar anomalía"}
         </AlertDialogAction>
       </AlertDialogFooter>
       </>
          }
      
      </AlertDialogContent>
    </AlertDialog>

  );
};

export default ModalAgregarLectura;
