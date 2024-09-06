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
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
import { zustandOrdenTrabajoStore } from "../../contexts/ZustandOrdenesDeTrabajoUsuario";
import IconButton from "./IconButton";
import { TrashIcon } from "lucide-react";
import { MdOutlineCancel } from "react-icons/md";
import ModalCerrarOT from "./ModalCerrarOT";
import ModalCerrarOT2 from "./ModalCerrarOT2";
import MarcoFormDetalleOtMonitor from "./MarcoFormDetalleOtMonitor";


const ModalDetalleOrdenTrabajoTomaEnBuscarUsuario = () => {
  const { toast } = useToast();
  const {
    arregloCrearOrdenesDeTrabajo,
    setDataOrdenesDeTrabajoHistorialToma,
    detalleOrdenDeTrabajoTomaMonitor2, setLoadingTable, setDataOrdenDeTrabajoMonitor,setIsOpenHijoModalDetalleMonitorOT, 
    isOpenPadreModalDetalleMonitorOT, setIsOpenPadreModalDetalleMonitorOT,
    setIsOpenHijoFormularioModalDetalleMonitorOT, isOpenHijoFormularioModalDetalleMonitorOT, detalleOrdenDeTrabajoTomaMonitor2etalleOrdenDeTrabajoTomaMonitor2,
    informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo, setLoadingTableFiltrarOrdenDeTrabajoMasivas, setAbrirModalInformacionTomaDetalleUsuarioToma, abrirModalInformacionTomaDetalleUsuarioToma,informacionModalDetalleEnToma 
  } = ZustandFiltrosOrdenTrabajo();

  const {
    usuariosEncontrados,
    setUsuariosEncontrados,
    idSeleccionadoGenerarOrdenDETrabajoToma,
  } = ZustandGeneralUsuario();

  // console.log(JSON.stringify(usuariosEncontrados));
  //console.log(idSeleccionadoGenerarOrdenDETrabajoToma);

  const action = () => {
    method();
    setIsOpen(false);
  };

  const [consultaIdToma, setConsultaIdToma] = useState<Usuario | null>(null);
  const [idDeLaTomaParametro, setIdDeLaTomaParametro] = useState(0);

  //SE DECLARA EL OBJETO USUARIO Y TOMAS
  //USUARIO ES UN OBJETO PERO TOMAS ES UN ARRAY DENTRO DEL OBJETO XD
  type Usuario = {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    correo: string;
    curp: string;
    tomas?: tomas;
  };

  type tomas = {
    id: number;
    codigo_toma: string;
  };

  //SETEAMOS CADA QUE SE ENCUENTRE USUARIOS

  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModal2, setAbrirModal2] = useState(false);

  const abrirModalGG = () => {
    //setAnomalia(anomalia);
    //setAccion("ver");
    setIsOpenHijoFormularioModalDetalleMonitorOT(true);
  };
  const abrirModalGG2 = () => {
    //setAnomalia(anomalia);
    //setAccion("ver");
    setIsOpenHijoModalDetalleMonitorOT(true);
  };

  useEffect(() => {
    setConsultaIdToma(usuariosEncontrados[0]);
  }, [usuariosEncontrados]);


  const getOrdenDeTrabajoMonitor = async () => {
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
    try {
      const response = await axiosClient.get("OrdenTrabajo/NoAsignada");
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      setDataOrdenDeTrabajoMonitor(response.data.data);
      console.log(response);
    } catch (error) {
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      console.error("Failed to fetch orden:", error);
    }
  };

  console.log(detalleOrdenDeTrabajoTomaMonitor2);

  const cancelarOrdenDeTrabajo = async () => {
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
    const values2 = {
      id: detalleOrdenDeTrabajoTomaMonitor2?.id
    }

    console.log(values2);
    try {
      const response = await axiosClient.post(`OrdenTrabajo/log_delete/`, values2);
      console.log(response);

      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);


      toast({
        title: "¡Éxito!",
        description: "La orden de trabajo se ha cancelado correctamente",
        variant: "success",
      })
      getOrdenDeTrabajoMonitor();

    } catch (response) {
      console.log(response);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "No se pudo cancelar.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);

    }
  };
  console.log("informacion obtenida desde la variable", usuariosEncontrados[0]);

  const cerrarUnaOT = async () => {


    setLoadingTable(true);
    try {
      const response = await axiosClient.put(`OrdenTrabajo/cerrar`, values);
      console.log(response);

      setLoadingTable(false);

      setIsOpen(false);

      toast({
        title: "¡Éxito!",
        description: "La orden de trabajo se ha cancelado correctamente",
        variant: "success",
      })
      getOrdenDeTrabajoMonitor();

    } catch (response) {
      console.log(response);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "No se pudo cancelar.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
      setLoadingTable(false);

    }
  };

  
  console.log(informacionModalDetalleEnToma);

  return (
    <AlertDialog open={abrirModalInformacionTomaDetalleUsuarioToma} onOpenChange={setAbrirModalInformacionTomaDetalleUsuarioToma}>
    <AlertDialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto p-4">
    <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex space-x-2">
              Información de la orden de trabajo
              <div
                className="flex justify-end ml-[18vh]"
                title="Cancelar orden de trabajo"
              ></div>
              <div>

              </div>
            </div>
          </AlertDialogTitle>

          <AlertDialogDescription>
            <div className="flex items-center space-x-2 ml-[180vh]">
              <IconButton onClick={cancelarOrdenDeTrabajo} title="Cancelar orden de trabajo">
                <TrashIcon className="w-[2vh] h-[2vh] ml-2" />
              </IconButton>

              {detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.modelo == "medidores" &&
              detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.accion == "registrar" &&
                <div>
                  <IconButton title="Cerrar orden de trabajo" onClick={abrirModalGG}><MdOutlineCancel /></IconButton>
                  <ModalCerrarOT/>
                </div>

              }
              {
                detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.modelo != "medidores" &&
                <div>
                  <IconButton title="Cerrar orden de trabajo" onClick={abrirModalGG2}><MdOutlineCancel /></IconButton>
                  <ModalCerrarOT2 />
                </div>


              }



            </div>
            <div className="p-4 space-y-7">
            {/* Información de la toma */}
            <MarcoFormDetalleOtMonitor title="Información de la toma">
                <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Código de toma:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.codigo_toma}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Clave catastral:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.clave_catastral}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Calle:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.calle}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Número de casa:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.numero_casa}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Colonia:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.colonia}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Ruta:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.ruta?.nombre}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Libro:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.libro?.nombre}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Tipo de toma:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.toma?.tipo_toma?.nombre}
                        </div>
                    </div>
                </div>
            </MarcoFormDetalleOtMonitor>
             {/* Información de la orden de trabajo */}
             <MarcoFormDetalleOtMonitor title="Información de la orden de trabajo">
                <div className="grid grid-cols-1 gap-y-4">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Tipo de OT:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                            {informacionModalDetalleEnToma?.orden_trabajo_catalogo?.descripcion}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Estado de la OT:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                            {informacionModalDetalleEnToma?.estado}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Creación de la OT:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.created_at}

                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">Fecha finalizada:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.fecha_finalizada}
                        </div>
                    </div>
                </div>
            </MarcoFormDetalleOtMonitor>
          
            <MarcoFormDetalleOtMonitor title="Operadores">
                <div className="grid grid-cols-1 gap-y-4 m2">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">La creo:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                            {informacionModalDetalleEnToma?.empleado_genero?.nombre_completo}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">La asigno:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                            {informacionModalDetalleEnToma?.empleadoAsigno?.nombre_completo}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="text-lg font-semibold w-1/3">El encargado de hacerla:</p>
                        <div className="mt-1 md:mt-0 w-2/3">
                        {informacionModalDetalleEnToma?.empleadoEncargado?.nombre_completo}

                        </div>
                    </div>
                   
                </div>
            </MarcoFormDetalleOtMonitor>


           </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpenPadreModalDetalleMonitorOT(false)}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction onClick={() => setIsOpenPadreModalDetalleMonitorOT(false)}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDetalleOrdenTrabajoTomaEnBuscarUsuario;
