import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "./input.tsx";
import { RiUserSearchFill } from "react-icons/ri";
import { ComboBoxAnomalia } from "./ComboBoxAnomalia.tsx";
import { ComboBoxPeriodoFacturacion } from "./ComboBoxPeriodoFacturacion.tsx";
import ZustandMonitorLectura from "../../contexts/ZustandMonitorLectura.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import IconButton from "./IconButton.tsx";
import lecturasService from "../../lib/LecturaService.ts";
import * as XLSX from "xlsx";
import axiosClient from "../../axios-client";

const ModalImportarExcelMonitorLectura = ({ open, setOpen }) => {
  const { toast } = useToast();
  const [lecturaValue, setLecturaValue] = useState('');
  const [comentarioValue, setComentarioValue] = useState('');
  const [seleccionarAnomalia, setSeleccionarAnomalia] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    usuariosEncontrados,
    agregarPeriodoFacturacion,
    setAgregarPeriodoFacturacion,
    agregarAnomalia,
    setAgregarAnomalia,
  } = ZustandGeneralUsuario();

  const { set_lecturas } = ZustandMonitorLectura();
  const [loadingLecturas, setLoadingLecturas] = useState(false);

  const fetchFact = async () => {
    setLoadingLecturas(true);
    let lecturasTemp = await lecturasService.get_all();
    setLoadingLecturas(false);
    set_lecturas(lecturasTemp);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImportExcel = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        const response = await axiosClient.post("/lectura/import", {
          lecturas: jsonData,
        });
        toast({
          title: "¡Éxito!",
          description: "Importación de lecturas realizada correctamente.",
          variant: "success",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: "Error al importar el archivo",
        });
        console.error("Error al importar el archivo", error);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleGuardarLectura = async () => {
    const values = {
      id_operador: 1,
      id_toma: usuariosEncontrados[0]?.tomas[0]?.id,
      id_periodo: agregarPeriodoFacturacion[0]?.id,
      id_origen: 1,
      modelo_origen: "toma",
      id_anomalia: agregarAnomalia[0]?.id,
      lectura: lecturaValue,
      comentario: comentarioValue,
    };

    try {
      await axiosClient.post("/lectura/store", values);
      toast({
        title: "¡Éxito!",
        description: "Lectura ingresada correctamente.",
        variant: "success",
      });
      fetchFact();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Error al ingresar la lectura.",
      });
    }
  };

  const handleSeleccionarAnomalia = () => {
    setSeleccionarAnomalia(!seleccionarAnomalia);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="text-xl">
              <b>Importar archivo Excel (.xlsx)</b>
            </div>
  
            {/* Contenedor para alinear los botones de "Seleccionar archivo" y "Importar Excel" */}
            <div className="flex mt-4 space-x-4 items-center">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="block"
              />
              <IconButton onClick={handleImportExcel}>
                Importar Excel
              </IconButton>
            </div>
          </AlertDialogTitle>
  
          <AlertDialogDescription>
            <div className="flex flex-col">
              <div className="text-xl">
                Nombre del usuario: {usuariosEncontrados[0]?.nombre_completo}
              </div>
              <span className="text-xl">
                Toma: {usuariosEncontrados[0]?.tomas[0]?.codigo_toma}
              </span>
            </div>
  
            <div className="flex justify-end">
              <div className="w-[20vh] bg-muted rounded-s-lg">
                <IconButton onClick={handleSeleccionarAnomalia}>
                  {!seleccionarAnomalia
                    ? "Seleccionar anomalía"
                    : "Ingresar lectura"}
                </IconButton>
              </div>
            </div>
  
            {!seleccionarAnomalia ? (
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
            ) : (
              <div className="mt-5">
                <ComboBoxAnomalia
                  selected_conceptos={agregarAnomalia}
                  set={setAgregarAnomalia}
                />
                <div className="mt-2 ml-2">Selecciona la anomalía</div>
              </div>
            )}
  
            <div className="mt-5">
              <ComboBoxPeriodoFacturacion
                selected_conceptos={agregarPeriodoFacturacion}
                set={setAgregarPeriodoFacturacion}
              />
              <div className="mt-2 ml-2">Selecciona el periodo de facturación</div>
            </div>
  
            <Input
              value={comentarioValue}
              onChange={(e) => setComentarioValue(e.target.value)}
              placeholder="Escribe un comentario."
              className="mt-5"
            />
            <div className="mt-2 ml-2">Escribe un comentario. (Opcional)</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
  
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setOpen(false)}>Cancelar</AlertDialogAction>
          <AlertDialogAction onClick={handleGuardarLectura}>
            {!seleccionarAnomalia ? "Ingresar lectura" : "Agregar anomalía"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalImportarExcelMonitorLectura;
