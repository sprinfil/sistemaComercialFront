import React, { useState } from "react";
import { Input } from "../../../components/ui/input";

import { ZustandFiltrosContratacion } from "../../../contexts/ZustandFiltrosContratacion";
import axios from 'axios';
import { Button } from "../../../components/ui/button";
import axiosClient from "../../../axios-client";
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
export const DetalleContrato = ({ selected_contrato }) => {
  const { accion, setAccion } = ZustandFiltrosContratacion();

  // Estado para manejar los datos editables
  const [formData, setFormData] = useState({
    id: selected_contrato?.id || 0,
    id_toma: selected_contrato?.toma.id || 0,
    id_usuario: selected_contrato?.usuario.id || 0,
    folio_solicitud: selected_contrato?.folio_solicitud || "",
    nombre_contrato: selected_contrato?.nombre_contrato || "",
    clave_catastral: selected_contrato?.clave_catastral || "",
    tipo_toma: selected_contrato?.toma?.tipo_toma?.nombre || "",
    diametro_toma: selected_contrato?.diametro_toma || "",
    calle: selected_contrato?.calle?.nombre || "",
    num_casa: selected_contrato?.num_casa || "",
    colonia: selected_contrato?.colonia?.nombre || "",
    codigo_postal: selected_contrato?.codigo_postal || "",
    entre_calle1: selected_contrato?.entre_calle1?.nombre || "",
    entre_calle2: selected_contrato?.entre_calle2?.nombre || "",
    localidad: selected_contrato?.localidad || "",
    municipio: selected_contrato?.municipio || "",
    servicio_contratado: selected_contrato?.servicio_contratado || "",
    estatus: selected_contrato?.estatus || "",
    tipo_contratacion: selected_contrato?.toma?.tipo_contratacion || "",
    codigo_toma: selected_contrato?.toma?.codigo_toma || "",
    usuario: selected_contrato?.usuario?.nombre_completo || "",
    direccion_completa: selected_contrato?.toma?.direccion_completa || "",
    direccion_notificaciones: selected_contrato?.toma?.direccion_notificacion || "",
    tipo_servicio: selected_contrato?.toma?.tipo_servicio || "",
    codigo_usuario: selected_contrato?.usuario?.codigo_usuario || "",
    usuario_telefono: selected_contrato?.usuario?.telefono || "",
    usuario_correo: selected_contrato?.usuario?.correo || "",

  });

  console.log(selected_contrato);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Enviar los datos actualizados
  const handleUpdate = async () => {

    console.log(formData);
    try {
      const response = axiosClient.put("contratos/update", { contrato: formData });
      console.log(response);
    }
    catch (err) {
      console.log(err);
    }
    setAccion("")
  };

  return (
    <div>
      <div className="flex space-x-2 mb-5">

        <div className="mt-4 mr-1 text-black text-xl dark:text-white">Folio de solicitud:</div>
        <div className="mt-[16px] text-lg ">
          {formData.folio_solicitud}

        </div>

      </div>
      <h1 className="text-xl text-black mt-10 mb-5 dark:text-white">
        Detalle de la contratación
      </h1>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
          <TableHead className="text-lg">Código del usuario</TableHead>
            <TableHead className="text-lg">Nombre del usuario</TableHead>
            <TableHead className="text-lg">Nombre del contrato</TableHead>
            <TableHead className="text-lg">Telefono</TableHead>
            <TableHead className="text-lg">Correo</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>

          <TableRow>
          <TableCell className="text-base">  {formData.codigo_usuario} </TableCell>
            <TableCell className="text-base" >  {formData.usuario} </TableCell>
            <TableCell className="text-base">{formData.nombre_contrato}</TableCell>
            <TableCell className="text-base">{formData.usuario_telefono}</TableCell>
            <TableCell className="text-base">{formData.usuario_correo}</TableCell>

          </TableRow>
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>

      <h1 className="text-xl mt-5 text-black mb-5 dark:text-white">
        Información de la toma
      </h1>

      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">Código de toma</TableHead>
            <TableHead className="text-lg">Clave catastral</TableHead>
            <TableHead className="text-lg">Tipo de toma</TableHead>
            <TableHead className="text-lg">Diametro de la toma</TableHead>
            <TableHead className="text-lg">Servicio contratado</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>

          <TableRow>
            <TableCell className="text-base">{formData.codigo_toma}</TableCell>
            <TableCell className="text-base" >{formData.clave_catastral}</TableCell>
            <TableCell className="text-base" >{formData.tipo_toma}</TableCell>
            <TableCell className="text-base">{formData.diametro_toma}</TableCell>
            <TableCell className="text-base">{formData.servicio_contratado}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>

       


        <h1 className="text-xl mt-5 text-black mb-5 dark:text-white">
          Dirección de la toma
        </h1>

        
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">Dirección</TableHead>
              <TableHead className="text-lg">Localidad</TableHead>
              <TableHead className="text-lg">Municipio</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>

            <TableRow>
              <TableCell className="text-base">{formData.direccion_completa}</TableCell>
              <TableCell className="text-base">{formData.localidad}</TableCell>
              <TableCell className="text-base">{formData.municipio}</TableCell>

            </TableRow>
          </TableBody>
          <TableFooter>

          </TableFooter>
        </Table>











      <h1 className="text-xl mt-10 text-black mb-5 dark:text-white">Tipo de Contratación y Giro de Negocio</h1>

      <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead  className="text-lg">Tipo de contratación</TableHead>
              <TableHead className="text-lg" >Tipo de servicio</TableHead>
              <TableHead className="text-lg">Giro comercial</TableHead>
              <TableHead className="text-lg">Estatus</TableHead>
              <TableHead className="text-lg">Dirección notificaciones</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>

            <TableRow>
              <TableCell className="text-base" >{formData.tipo_contratacion}</TableCell>
              <TableCell className="text-base">{formData.tipo_servicio}</TableCell>
              <TableCell className="text-base"></TableCell>
              <TableCell className="text-base">{formData.estatus}</TableCell>
              <TableCell className="text-base"></TableCell>

            </TableRow>
          </TableBody>
          <TableFooter>

          </TableFooter>
        </Table>

         
        
          {accion == "editar" && <div className="flex justify-end">
            <Button
              onClick={handleUpdate}
              className="mt-8"
            >
              Actualizar información
            </Button>
          </div>}


</div>

        );
};
