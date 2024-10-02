import React, { useState, useRef } from "react"; 
import { ColumnDef } from "@tanstack/react-table";
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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const ModalImportarExcelMonitorLectura = ({ open, setOpen }) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importedData, setImportedData] = useState([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    usuariosEncontrados,
    agregarPeriodoFacturacion,
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

      console.log(jsonData);

      setImportedData(jsonData);

      try {
        await axiosClient.post("/lectura/import", { lecturas: jsonData });
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
    if (importedData.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No hay datos importados para guardar.",
      });
      return;
    }

    const promises = importedData.map(async (item) => {
      const values = {
        id_operador: 1,
        id_toma: item.id_toma,
        id_periodo: agregarPeriodoFacturacion[0]?.id,
        id_origen: 1,
        modelo_origen: "toma",
        id_anomalia: item.id_anomalia,
        lectura: item.lectura,
        comentario: item.comentario,
      };

      console.log("Valores a enviar:", values);

      return axiosClient.post("/lectura/store", values);
    });

    try {
      await Promise.all(promises);
      toast({
        title: "¡Éxito!",
        description: "Todas las lecturas fueron ingresadas correctamente.",
        variant: "success",
      });
      fetchFact();
      setOpen(false);
    } catch (error) {
      console.error("Error al guardar las lecturas", error);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Error al ingresar las lecturas.",
      });
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setImportedData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCloseModal = () => {
    // Limpiar los estados al cerrar el modal
    setOpen(false);
    handleClearFile();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleCloseModal}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="text-xl">
              <b>Importar archivo Excel (.xlsx)</b>
            </div>
            <div className="text-xl mt-5">Columnas en el archivo Excel (.xlsx) id_toma, id_anomalia, lectura, comentario</div>
          </AlertDialogTitle>

          <AlertDialogDescription>
            <div className="flex flex-col">
              <div className="text-xl">
                <div className="flex mt-8 items-center justify-between">
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    className="block"
                    ref={fileInputRef}
                  />
                  <div className="flex justify-end space-x-4">
                    <div className="w-[20vh] bg-muted rounded-s-lg">
                      <IconButton onClick={handleImportExcel}>
                        Importar Excel
                      </IconButton>
                    </div>
                    <div className="w-[20vh] bg-muted rounded-s-lg">
                      <IconButton onClick={handleClearFile}>
                        Borrar selección
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xl mt-5">Vista previa de los datos</div>

            <div className="mt-5">
              {importedData.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toma</TableHead>
                      <TableHead>Anomalia</TableHead>
                      <TableHead>Lectura</TableHead>
                      <TableHead>Comentario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importedData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.id_toma}</TableCell>
                        <TableCell>{item.id_anomalia}</TableCell>
                        <TableCell>{item.lectura}</TableCell>
                        <TableCell>{item.comentario}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={handleCloseModal}>Cancelar</AlertDialogAction>
          <AlertDialogAction onClick={handleGuardarLectura}>Aceptar y cerrar</AlertDialogAction>
        </AlertDialogFooter>
        
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalImportarExcelMonitorLectura;
