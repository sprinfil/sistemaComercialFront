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


const ModalMonitorOrdenTrabajoTable = () => {
  const { toast } = useToast();
  const {
    arregloCrearOrdenesDeTrabajo,
    setDataOrdenesDeTrabajoHistorialToma,
    detalleOrdenDeTrabajoTomaMonitor2, setLoadingTable, setDataOrdenDeTrabajoMonitor,setIsOpenHijoModalDetalleMonitorOT, 
    isOpenPadreModalDetalleMonitorOT, setIsOpenPadreModalDetalleMonitorOT,
    setIsOpenHijoFormularioModalDetalleMonitorOT, isOpenHijoFormularioModalDetalleMonitorOT, detalleOrdenDeTrabajoTomaMonitor2etalleOrdenDeTrabajoTomaMonitor2,
    informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo, setLoadingTableFiltrarOrdenDeTrabajoMasivas
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
  console.log("informacion obtenida desde la variable", detalleOrdenDeTrabajoTomaMonitor2.id_empleado_asigno);


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

  console.log(detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.accion);

  return (
    <AlertDialog open={isOpenPadreModalDetalleMonitorOT} onOpenChange={setIsOpenPadreModalDetalleMonitorOT}>
      <AlertDialogContent className="max-w-[65vh]">
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
            <div className="flex items-center space-x-2">
              <div className="text-xl">Toma</div>
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
            <div className="p-4 bg-muted shadow-md rounded-md space-y-2 ">
              <div className="flex space-x-4 items-center">
                <p className="text-lg font-semibold">Codigo de toma: </p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.toma?.codigo_toma}
                </div>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold">Tipo de OT:</p>
                <div className="mt-[0.9vh]">
                  {
                    detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo
                      ?.descripcion
                  }
                </div>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold ">Estado de la OT:</p>
                <div>{detalleOrdenDeTrabajoTomaMonitor2?.estado}</div>
              </div>

              <div className="flex space-x-4">
                <p className="text-lg font-semibold ">Creación de la OT:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.created_at
                    ? new Date(
                      detalleOrdenDeTrabajoTomaMonitor2.created_at
                    ).toLocaleString("es-ES", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                    : "Fecha no disponible"}
                </div>
              </div>

              <div className="flex space-x-2">
                <p className="text-lg font-semibold ">Fecha finalizada:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.fecha_finalizada}
                </div>
              </div>

              <div className="flex space-x-2">
                <p className="text-lg font-semibold ">Clave catastral:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.toma?.clave_catastral}
                </div>
              </div>
              <div className="flex space-x-2">
                <p className="text-lg font-semibold ">Calle:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.toma?.calle}
                </div>
              </div>
              <div className="flex space-x-2">
                <p className="text-lg font-semibold ">Numero de casa:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.toma?.numero_casa}
                </div>
              </div>
              <div className="flex space-x-2">
                <p className="text-lg font-semibold ">Colonia:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.toma?.colonia}
                </div>
              </div>
              <div className="flex space-x-2">
                <p className="text-lg font-semibold ">Ruta:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.toma?.libro?.nombre}
                </div>
              </div>
              <div className="flex space-x-2">
                <p className="text-lg font-semibold ">Tipo de toma:</p>
                <div className="mt-[0.9vh]">
                  {detalleOrdenDeTrabajoTomaMonitor2?.toma?.tipo_toma?.nombre}
                </div>
              </div>
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

export default ModalMonitorOrdenTrabajoTable;
