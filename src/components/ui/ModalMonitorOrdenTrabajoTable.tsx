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
import MarcoForm from "./MarcoForm";
import MarcoFormDetalleOtMonitor from "./MarcoFormDetalleOtMonitor";
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
import { FaCheckCircle } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

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

  console.log(detalleOrdenDeTrabajoTomaMonitor2.id_empleado_asigno);
  console.log(detalleOrdenDeTrabajoTomaMonitor2);

  return (
    <AlertDialog open={isOpenPadreModalDetalleMonitorOT} onOpenChange={setIsOpenPadreModalDetalleMonitorOT}>
    <AlertDialogContent className="max-w-[100vw] max-h-[100vh] overflow-auto p-4">
    <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex space-x-2">
              Detalle de la orden de trabajo
              
             
            </div>
          </AlertDialogTitle>

          <AlertDialogDescription>
            <div className="flex items-center justify-center space-x-2 bg-muted mt-2">
             
              {detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.modelo == "medidores" &&
              detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.accion == "registrar" &&
                <div className="">
                  <IconButton title="Cerrar orden de trabajo" onClick={abrirModalGG}><FaCheckCircle className="w-[3.0vh] h-[3.0vh]"/></IconButton>
                  <ModalCerrarOT/>
                </div>

              }
              {
                detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.modelo != "medidores" &&
                <div className="" >
                  <IconButton title="Cerrar orden de trabajo" onClick={abrirModalGG2}><FaCheckCircle className="w-[3.0vh] h-[3.0vh]" /></IconButton>
                  <ModalCerrarOT2 />
                </div>


              }
                <IconButton onClick={cancelarOrdenDeTrabajo} title="Cancelar orden de trabajo">
                                <TiCancel className="w-[5vh] h-[4.3vh]" />
                              </IconButton>



            </div>
            <div className="p-4 space-y-7 mt-5">
            {/* Información de la toma */}
            <h1 className="text-xl mb-[2vh] text-black dark:text-white">
                                Información de la toma
                            </h1>
            <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre del usuario</TableHead>
          <TableHead>Código de toma</TableHead>
          <TableHead>Clave catastral</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>Ruta y Libro</TableHead>
          <TableHead>Tipo de toma</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow >
            <TableCell >
            {detalleOrdenDeTrabajoTomaMonitor2?.toma?.usuario?.nombre_completo}

            </TableCell>
            <TableCell>
            {detalleOrdenDeTrabajoTomaMonitor2?.toma?.codigo_toma}

            </TableCell>
            <TableCell>
            {detalleOrdenDeTrabajoTomaMonitor2?.toma?.clave_catastral}

            </TableCell>
            <TableCell >
            {detalleOrdenDeTrabajoTomaMonitor2?.toma?.direccion_completa}

            </TableCell>
            <TableCell >
            {detalleOrdenDeTrabajoTomaMonitor2?.toma?.ruta?.nombre + " "}
            {detalleOrdenDeTrabajoTomaMonitor2?.toma?.libro?.nombre}

            </TableCell>
            <TableCell >
            {detalleOrdenDeTrabajoTomaMonitor2?.toma?.tipo_toma?.nombre}

            </TableCell>
          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
        
        </TableRow>
      </TableFooter>
    </Table>
        
                 {/* Información de la orden de trabajo */}
                 <h1 className="text-xl mb-[2vh] text-black dark:text-white">
                 Información de la orden de trabajo
                            </h1>
            <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo de OT</TableHead>
          <TableHead>Estado de la OT</TableHead>
          <TableHead>Creación de la OT</TableHead>
          <TableHead>Fecha finalizada</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow >
            <TableCell >
            {detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.descripcion}

            </TableCell>
            <TableCell>
            {detalleOrdenDeTrabajoTomaMonitor2?.estado}

            </TableCell>
            <TableCell>
            {detalleOrdenDeTrabajoTomaMonitor2?.created_at}

            </TableCell>
            <TableCell >
            {detalleOrdenDeTrabajoTomaMonitor2?.fecha_finalizada}

            </TableCell>
        
          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
        
        </TableRow>
      </TableFooter>
    </Table>

                    {/* Información de la orden de trabajo */}
                    <h1 className="text-xl mb-[2vh] text-black dark:text-white">
                    Operadores
                            </h1>
            <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>La creó</TableHead>
          <TableHead>La asignó</TableHead>
          <TableHead>Encargado de hacerla</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow >
            <TableCell >
            {detalleOrdenDeTrabajoTomaMonitor2?.empleado_genero?.nombre_completo}

            </TableCell>
            <TableCell>
            {detalleOrdenDeTrabajoTomaMonitor2?.empleadoAsigno?.nombre_completo}

            </TableCell>
            <TableCell>
            {detalleOrdenDeTrabajoTomaMonitor2?.empleadoEncargado?.nombre_completo}

            </TableCell>
           
        
          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
        
        </TableRow>
      </TableFooter>
    </Table>
            
           
        </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
       
          <AlertDialogAction onClick={() => setIsOpenPadreModalDetalleMonitorOT(false)} className="mt-3 w-[15vh] mr-4 mb-3" >
            Salir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalMonitorOrdenTrabajoTable;
