import React, { useState } from "react";
import { Input } from "../../../components/ui/input";

import { ZustandFiltrosContratacion } from "../../../contexts/ZustandFiltrosContratacion";
import axios from 'axios';
import { Button } from "../../../components/ui/button";
import axiosClient from "../../../axios-client";

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
    diametro_de_la_toma: selected_contrato?.diametro_de_la_toma || "",
    calle: selected_contrato?.calle?.nombre || "",
    num_casa: selected_contrato?.num_casa || "",
    colonia: selected_contrato?.colonia?.nombre || "",
    codigo_postal: selected_contrato?.codigo_postal || "",
    entre_calle1: selected_contrato?.entre_calle1?.nombre || "",
    entre_calle2: selected_contrato?.entre_calle2?.nombre|| "",
    localidad: selected_contrato?.localidad || "",
    municipio: selected_contrato?.municipio || "",
    servicio_contratado: selected_contrato?.servicio_contratado || "",
    estatus: selected_contrato?.estatus || "",
    tipo_contratacion: selected_contrato?.toma?.tipo_contratacion|| "",
    codigo_toma: selected_contrato?.toma?.codigo_toma|| "",
    usuario: selected_contrato?.usuario?.nombre_completo|| "",

  });

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
    try{
        const response = axiosClient.put("contratos/update", { contrato: formData });
        console.log(response);
    }
    catch(err)
    {
      console.log(err);
    }
    setAccion("")
  };

  return (
    <div>
      
         <div className="mb-[3vh]">
      <h1 className="text-2xl mt-[2vh] text-black">Detalle de la contratación</h1>
      <div className="flex space-x-2">
      <div className="mt-4 mr-1 text-black text-lg">Usuario:</div>
      <div className="mt-[22px]">
      {formData.usuario}

        </div>
        </div>
    <div className="flex space-x-2">
      
      <div className="mt-4 mr-1 text-black text-lg">Folio de solicitud:</div>
      <div className="mt-[22px]">
      {formData.folio_solicitud}

        </div>
      </div>
      <div className="flex flex-col mt-5">
            <div className="block text-lg text-black mt-2">Nombre del contrato:</div>
            <Input
              name="nombre_contrato"
              className="w-full mt-2"
              value={formData.nombre_contrato}
              onChange={handleChange}
              readOnly
            />
          </div>


        
      </div>

      <h1 className="text-2xl text-black">Información de la toma</h1>
      <div className="mt-5">
        <div className="flex space-x-2">
        <div className="mt-4 mr-1 text-black text-lg">Codigo de toma:</div>
      <div className="mt-[22px]">
      {formData.codigo_toma}

        </div>
        </div>
 
        <div className="block text-lg mb-2 text-black mt-5">Clave catastral:</div>
        <Input
          name="clave_catastral"
          value={formData.clave_catastral}
          onChange={handleChange}
          readOnly
        />
         <div className="flex space-x-2 mt-4">
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-lg mt-2 text-black">Tipo de toma:</div>
        
        <Input
          name="tipo_toma"
          value={formData.tipo_toma}
          onChange={handleChange}
          readOnly
        />
          </div>
         
         <div className="flex flex-col space-y-2 w-1/2">
         <div className="block text-lg mt-2  text-black">Diametro de la toma:</div>

        <Input
          name="diametro_de_la_toma"
          value={formData.diametro_de_la_toma}
          onChange={handleChange}
          readOnly
        />
          </div>
         </div>
       
         

        <h1 className="text-2xl mt-[3vh] text-black">Dirección de la toma</h1>

        <div className="flex space-x-4 mt-4">
          <div className="flex flex-col space-y-2 w-1/2">
            <label className="block text-lg mt-2 text-black">Calle:</label>
            <Input
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="flex flex-col space-y-2 w-1/2">
            <label className="block text-lg mt-2 text-black">Número de casa:</label>
            <Input
              name="num_casa"
              value={formData.num_casa}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2  w-1/2">
          <div className="block text-lg text-black">Colonia:</div>
            <Input
              name="colonia"
              value={formData.colonia}
              onChange={handleChange}
              readOnly
            />
          </div>
      
        <div className="flex flex-col space-y-2  w-1/2">
        <div className="block text-lg text-black">Codigo postal:</div>
            <Input
              name="codigo_postal"
              value={formData.codigo_postal}
              onChange={handleChange}
              readOnly
            />
        </div>
        </div>
     
        
        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2 w-1/2">
            <div className="block text-lg text-black">Entre calle 1:</div>
            <Input
              name="entre_calle1"
              value={formData.entre_calle1}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-2 w-1/2">
            <div className="block text-lg text-black">Entre calle 2:</div>
            <Input
              name="entre_calle2"
              value={formData.entre_calle2}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-lg mt-2 text-black">Localidad:</div>
        <Input
          name="localidad"
          value={formData.localidad}
          onChange={handleChange}
          readOnly
        />
          </div>
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-lg mt-2 text-black">Municipio:</div>
        <Input
          name="municipio"
          value={formData.municipio}
          onChange={handleChange}
          readOnly
        />
        </div>
        </div>
       

       
        <h1 className="text-2xl mt-[2vh] text-black mb-4">Servicio contratado</h1>
    
        <Input
          name="servicio_contratado"
          value={formData.servicio_contratado}
          onChange={handleChange}
          readOnly
        />
                <h1 className="text-2xl mt-[3vh] text-black mb-4">Tipo de Contratación y Giro de Negocio</h1>

        <div className="flex space-x-2  ">

        <div className="flex flex-col space-y-2">
        <div className="block text-lg mt-2 text-black">Tipo de contratación:</div>
            <Input
              name="tipo_contratacion"
              value={formData.tipo_contratacion}
              onChange={handleChange}
              readOnly
              className="w-[120vh]"
            />

                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                  <div className="block text-lg mt-2 text-black">Giro comercial:</div>
                  <Input
                    name="estatus"
                    value={formData.estatus}
                    onChange={handleChange}
                    readOnly
        
                  />

                  </div>
       
     
        </div>

        <div className="block text-lg mt-4 text-black mb-2">Estatus:</div>
        <Input
          name="estatus"
          value={formData.estatus}
          onChange={handleChange}
          readOnly
          className="mb-6"
        />
      </div>

                {accion == "editar" && <div className="flex justify-end">
                    <Button
                        onClick={handleUpdate}
                        className="mt-8"
                      >
                        Actualizar información
                      </Button>
                </div> }
        
     

    
    </div>
  );
};
