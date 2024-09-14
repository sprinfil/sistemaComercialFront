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
import { MdDeleteOutline, MdOutlineDeleteForever } from "react-icons/md";
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
import { GoUpload } from "react-icons/go";

import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { Input } from "./input.tsx";

const ModalSubirArchivosContratacion = ({selected_contrato}) => {
  const { toast } = useToast();

  const {
    booleanModalSubirArchivosContratacion,
    setBooleanModalSubirArchivosContratacion,idContrato
    
  } = ZustandFiltrosContratacion();

  const [operadorSeleccionado, setOperadorSeleccionado] = useState();
  const { usuariosEncontrados } = ZustandGeneralUsuario();

  console.log(usuariosEncontrados[0]?.id);

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const form = useForm<z.infer<typeof cambioPropietarioSchema>>({
    resolver: zodResolver(cambioPropietarioSchema),
    defaultValues: {
      id: 0,
      nombre_contrato: "",
    },
  });
console.log(idContrato);


  const subirArchivos = () => {

    if(selected_contrato)
    {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`documentos[${index}]`, file); // Laravel espera el formato documentos[0], documentos[1], etc.
      });
        // Agregar otros datos al FormData
        formData.append('id_modelo', selected_contrato.id_toma);
        formData.append('modelo', 'tomas');

        try {
          const response = axiosClient.post("contratos/subirArchivos", formData);
          console.log(response);
          toast({
            title: "¡Éxito!",
            description: "Los archivos se han cargado correctamente.",
            variant: "success",
    
        })
        } catch (error) {
          console.log(error.response);
          
          
          toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Algo salió mal.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
        }


    }
    else
    {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`documentos[${index}]`, file); // Laravel espera el formato documentos[0], documentos[1], etc.
      });
        // Agregar otros datos al FormData
        formData.append('id_modelo', idContrato);
        formData.append('modelo', 'tomas');

        try {
          const response = axiosClient.post("contratos/subirArchivos", formData);
          console.log(response);
          toast({
            title: "¡Éxito!",
            description: "Los archivos se han cargado correctamente.",
            variant: "success",
    
        })
        } catch (error) {
          console.log(error.response);
          
          
          toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Algo salió mal.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
        }
    }
   

   
    
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setBooleanModalSubirArchivosContratacion(false);
  };

  return (
    <AlertDialog
      open={booleanModalSubirArchivosContratacion}
      onOpenChange={setBooleanModalSubirArchivosContratacion}
    >
      <AlertDialogContent className="max-w-[70vh] max-h-screen overflow-auto">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            {/* Título al principio */}
            <div className="flex">
              <span className="text-lg">Selecciona los archivos a subir</span>
            </div>
          </div>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="flex items-start justify-start p-4">
                  <label
                    htmlFor="archivo"
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-800 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2h10v10H5V5zm2 2h6v2H7V7zm0 4h6v2H7v-2z" />
                    </svg>
                    Seleccionar archivos
                  </label>
                  <input
                    type="file"
                    name="archivo"
                    id="archivo"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="ml-[20vh] border border-green-900 rounded-lg">
                    <IconButton onClick={subirArchivos}>
                      <p className="text-base">Subir archivos</p>{" "}
                      <GoUpload className="ml-2" />
                    </IconButton>
                  </div>
                </div>
                {/* Display selected files */}
                {files.length > 0 && (
                  <div className="file-list mt-4">
                    <h3 className="text-base">Archivos seleccionados:</h3>
                    <ul>
                      {files.map((file, index) => (
                        <li
                          key={index}
                          className="file-item flex items-center ml-2"
                        >
                          <span>{file.name}</span>
                          <IconButton
                            type="button"
                            onClick={() => handleRemoveFile(file)}
                            className="btn-remove"
                          >
                            <MdOutlineDeleteForever />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalSubirArchivosContratacion;
