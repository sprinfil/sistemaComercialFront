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
const ModalGenerarOrdenDeTrabajo = ({
  isOpen,
  setIsOpen,
  method,
  tipoOperacion,
}) => {
  const { toast } = useToast();
  const { loadingTable, setLoadingTable } = zustandOrdenTrabajoStore();
  const {
    arregloCrearOrdenesDeTrabajo,
    setDataOrdenesDeTrabajoHistorialToma,
    setLoadingTableOrdenesDeTrabajoHistorial,
  } = ZustandFiltrosOrdenTrabajo();

  console.log(tipoOperacion);

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

  useEffect(() => {
    setConsultaIdToma(usuariosEncontrados[0]);
  }, [usuariosEncontrados]);

  //console.log("Tomas ID:", consultaIdToma?.tomas[0].codigo_toma);

  //volver a tener las ordenes de trabajo bhistorial del usuario
  const getOrdenDeTrabajoDelUsuario = async () => {
    setLoadingTableOrdenesDeTrabajoHistorial(true);
    try {
      const response = await axiosClient.get(
        `Toma/ordenesTrabajo/${usuariosEncontrados[0]?.tomas[0]?.codigo_toma}`
      );
      setDataOrdenesDeTrabajoHistorialToma(response.data.data);
      setLoadingTableOrdenesDeTrabajoHistorial(false);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTableOrdenesDeTrabajoHistorial(false);
      console.error("Failed to fetch Orden de trabajo:", error);
    }
  };

  //GENERA ORDEN DE TRABAJO A UNA TOMA
  const GenerarOrdenDeTrabajoToma = async () => {
    setLoadingTable(true);
    const values2 = {
      ordenes_trabajo: [
        {
          id_toma: consultaIdToma?.tomas[0]?.id,
          id_orden_trabajo_catalogo: idSeleccionadoGenerarOrdenDETrabajoToma,
        },
      ],
    };
    console.log(values2);
  
    try {
      const response = await axiosClient.post(`OrdenTrabajo/create`, values2);
  
      if (response.status === 202) {
        const errorMessage = response.data?.message || "Ha ocurrido un error inesperado.";
  
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: errorMessage,
          action: (
            <ToastAction altText="Try again">Intentar de nuevo</ToastAction>
          ),
        });
      } else {
        setIsOpen(false);
        setLoadingTable(false);
        console.log(response);
        toast({
          title: "¡Éxito!",
          description: "Se ha creado la orden de trabajo.",
          variant: "success",
        });
        getOrdenDeTrabajoDelUsuario();
      }
    } catch (error) {
      setLoadingTable(false);
      console.error("Error en la solicitud:", error);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo paso mal.",
        action: (
          <ToastAction altText="Try again">Intentar de nuevo</ToastAction>
        ),
      });
    }
  };

  const GenerarOrdenDeTrabajoMasivaToma = async () => {
    const arreglo = arregloCrearOrdenesDeTrabajo.map((item) => ({
      id_toma: item.id,
      id_orden_trabajo_catalogo: idSeleccionadoGenerarOrdenDETrabajoToma,
    }));
    const values2 = {
      ordenes_trabajo: arreglo,
    };
    console.log(values2);
    try {
      const response = await axiosClient.post(
        `OrdenTrabajo/generar/masiva`,
        values2
      );
      setIsOpen(false);
      console.log(response.data);
      toast({
        title: "¡Éxito!",
        description: "Se ha creado la orden masiva de trabajo.",
        variant: "success",
      });

      // Para acceder a los mensajes de error:
      const errores = response.data; // Accede al array de errores

      // Usa map para extraer los mensajes de error
      const mensajesDeError = errores.map((errorObj) => errorObj.Error);

      // Muestra los mensajes de error en la consola
      console.log(mensajesDeError);

      // Opcional: Mostrar los errores en un toast o en la UI
      mensajesDeError.forEach((mensaje) => {
        // Muestra un toast para cada mensaje de error
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: mensaje, // Muestra cada mensaje de error
          action: (
            <ToastAction altText="Try again">Intentar de nuevo</ToastAction>
          ),
        });
      
        // Si necesitas una lógica específica para ciertos mensajes, puedes usar una condición
        if (mensaje.includes("supera el límite")) {
          // Acción específica si el mensaje contiene cierto texto
          console.log("Error específico detectado:", mensaje);
      
          // Muestra un toast específico si el error coincide con la condición
          toast({
            variant: "destructive",
            title: "Error específico",
            description: mensaje, // Usa el mensaje original en el toast
            action: (
              <ToastAction altText="Try again">Intentar de nuevo</ToastAction>
            ),
          });
        }
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo salió mal.",
        action: (
          <ToastAction altText="Try again">Intentar de nuevo</ToastAction>
        ),
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-[90vh]">
        <AlertDialogHeader>
          {tipoOperacion == "masiva" ? (
            <AlertDialogTitle>
              Crear nueva orden de trabajo masiva
            </AlertDialogTitle>
          ) : (
            <AlertDialogTitle>Crear nueva orden de trabajo</AlertDialogTitle>
          )}

          <AlertDialogTitle>
            <div className="text-xs text-gray-600">
              Selecciona una orden de trabajo para la toma.
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <EscogerOrdenDeTrabajoTable />
            {/*LA TABLA PARA ESCOGER ORDEN DE TRABAJO*/}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          {tipoOperacion == "masiva" ? (
            <AlertDialogAction onClick={GenerarOrdenDeTrabajoMasivaToma}>
              Crear orden de trabajo masiva
            </AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={GenerarOrdenDeTrabajoToma}>
              Crear orden de trabajo
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalGenerarOrdenDeTrabajo;
