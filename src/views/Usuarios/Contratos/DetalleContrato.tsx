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
    estatus: selected_contrato?.estatus || ""
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
        {accion == "editar" ? 
        <>
         <div className="mb-[3vh]">
      <h1 className="text-2xl mt-[2vh] text-black">Detalle de la contratación</h1>
    
        
        <div className="flex space-x-2 items-center mt-5">
          <div className="flex flex-col">
            <div className="block text-xl text-black">Folio de solicitud:</div>
            <Input
              name="folio_solicitud"
              className="w-[95vh]"
              value={formData.folio_solicitud}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <div className="block text-xl text-black">Nombre del contrato:</div>
            <Input
              name="nombre_contrato"
              className="w-[95vh]"
              value={formData.nombre_contrato}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <h1 className="text-2xl text-black">Información de la toma</h1>
      <div className="mt-5">
        <div className="block text-xl mb-2 text-black">Clave catastral:</div>
        <Input
          name="clave_catastral"
          value={formData.clave_catastral}
          onChange={handleChange}
        />
         <div className="flex space-x-2">
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-xl mt-2 text-black">Tipo de toma:</div>
        
        <Input
          name="tipo_toma"
          value={formData.tipo_toma}
          onChange={handleChange}
        />
          </div>
         
         <div className="flex flex-col space-y-2 w-1/2">
         <div className="block text-xl mt-2  text-black">Diametro de la toma:</div>

        <Input
          name="diametro_de_la_toma"
          value={formData.diametro_de_la_toma}
          onChange={handleChange}
        />
          </div>
         </div>
       
         

        <h1 className="text-2xl mt-[3vh] text-black">Dirección de la toma</h1>

        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2 w-1/2">
            <label className="block text-xl mt-2 text-black">Calle:</label>
            <Input
              name="calle"
              value={formData.calle}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-2 w-1/2">
            <label className="block text-xl mt-2 text-black">Número de casa:</label>
            <Input
              name="num_casa"
              value={formData.num_casa}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2  w-1/2">
          <div className="block text-xl text-black">Colonia:</div>
            <Input
              name="colonia"
              value={formData.colonia}
              onChange={handleChange}
            />
          </div>
      
        <div className="flex flex-col space-y-2  w-1/2">
        <div className="block text-xl text-black">Codigo postal:</div>
            <Input
              name="codigo_postal"
              value={formData.codigo_postal}
              onChange={handleChange}
            />
        </div>
        </div>
     
        
        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2 w-1/2">
            <div className="block text-xl text-black">Entre calle 1:</div>
            <Input
              name="entre_calle1"
              value={formData.entre_calle1}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-1/2">
            <div className="block text-xl text-black">Entre calle 2:</div>
            <Input
              name="entre_calle2"
              value={formData.entre_calle2}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-xl mt-2 text-black">Localidad:</div>
        <Input
          name="localidad"
          value={formData.localidad}
          onChange={handleChange}
        />
          </div>
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-xl mt-2 text-black">Municipio:</div>
        <Input
          name="municipio"
          value={formData.municipio}
          onChange={handleChange}
        />
        </div>
        </div>
       

       
        <h1 className="text-2xl mt-[2vh] text-black mb-4">Servicio contratado</h1>
    
        <Input
          name="servicio_contratado"
          value={formData.servicio_contratado}
          onChange={handleChange}
          disabled
        />

        <div className="block text-xl mt-2 text-black">Estatus:</div>
        <Input
          name="estatus"
          value={formData.estatus}
          onChange={handleChange}
          disabled
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
                </>
        :
        <>
         <div className="mb-[3vh]">
      <h1 className="text-2xl mt-[2vh] text-black">Detalle de la contratación</h1>
    
        
        <div className="flex space-x-2 items-center mt-5">
          <div className="flex flex-col">
            <div className="block text-xl text-black">Folio de solicitud:</div>
            <Input
              name="folio_solicitud"
              className="w-[95vh]"
              value={formData.folio_solicitud}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <div className="block text-xl text-black">Nombre del contrato:</div>
            <Input
              name="nombre_contrato"
              className="w-[95vh]"
              value={formData.nombre_contrato}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
      </div>

      <h1 className="text-2xl text-black">Información de la toma</h1>
      <div className="mt-5">
        <div className="block text-xl mb-2 text-black">Clave catastral:</div>
        <Input
          name="clave_catastral"
          value={formData.clave_catastral}
          onChange={handleChange}
          disabled
        />
         <div className="flex space-x-2">
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-xl mt-2 text-black">Tipo de toma:</div>
        
        <Input
          name="tipo_toma"
          value={formData.tipo_toma}
          onChange={handleChange}
          disabled
        />
          </div>
         
         <div className="flex flex-col space-y-2 w-1/2">
         <div className="block text-xl mt-2  text-black">Diametro de la toma:</div>

        <Input
          name="diametro_de_la_toma"
          value={formData.diametro_de_la_toma}
          onChange={handleChange}
          disabled
        />
          </div>
         </div>
       
         

        <h1 className="text-2xl mt-[3vh] text-black">Dirección de la toma</h1>

        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2 w-1/2">
            <label className="block text-xl mt-2 text-black">Calle:</label>
            <Input
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex flex-col space-y-2 w-1/2">
            <label className="block text-xl mt-2 text-black">Número de casa:</label>
            <Input
              name="num_casa"
              value={formData.num_casa}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2  w-1/2">
          <div className="block text-xl text-black">Colonia:</div>
            <Input
              name="colonia"
              value={formData.colonia}
              onChange={handleChange}
              disabled
            />
          </div>
      
        <div className="flex flex-col space-y-2  w-1/2">
        <div className="block text-xl text-black">Codigo postal:</div>
            <Input
              name="codigo_postal"
              value={formData.codigo_postal}
              onChange={handleChange}
              disabled
            />
        </div>
        </div>
     
        
        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col space-y-2 w-1/2">
            <div className="block text-xl text-black">Entre calle 1:</div>
            <Input
              name="entre_calle1"
              value={formData.entre_calle1}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="flex flex-col space-y-2 w-1/2">
            <div className="block text-xl text-black">Entre calle 2:</div>
            <Input
              name="entre_calle2"
              value={formData.entre_calle2}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-xl mt-2 text-black">Localidad:</div>
        <Input
          name="localidad"
          value={formData.localidad}
          onChange={handleChange}
          disabled
        />
          </div>
          <div className="flex flex-col space-y-2 w-1/2">
          <div className="block text-xl mt-2 text-black">Municipio:</div>
        <Input
          name="municipio"
          value={formData.municipio}
          onChange={handleChange}
          disabled
        />
        </div>
        </div>
       

       
        <h1 className="text-2xl mt-[2vh] text-black mb-4">Servicio contratado</h1>
    
        <Input
          name="servicio_contratado"
          value={formData.servicio_contratado}
          onChange={handleChange}
          disabled
        />

        <div className="block text-xl mt-2 text-black">Estatus:</div>
        <Input
          name="estatus"
          value={formData.estatus}
          onChange={handleChange}
          disabled
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
                </>
        }
     

    
    </div>
  );
};
