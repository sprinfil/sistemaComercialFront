import React, { useEffect, useState } from 'react'
import MenuLateral from '../../../components/ui/MenuLateral'
import { ConfiguracionPermisos } from './VistaIndividualPermiso/ConfiguracionPermisos'
import { ContextProviderPermisos, useStateContextPermisos } from '../../../contexts/ContextDetallePermisos'
import { useStateContext } from '../../../contexts/ContextRol'
import { PantallaPermiso } from './PantallaPermiso'
import axiosClient from '../../../axios-client'
import Loader from '../../../components/ui/Loader'

const Permisos = () => {

  const { rol } = useStateContext();
  const { permissions, setPermissions } = useStateContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    getRoles();
  }, [rol]);

  

  const getRoles = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/Rol/get_all_permissions_by_rol_id/${rol.id}`);
      setLoading(false);
      setPermissions(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  useEffect(() => {
    //console.log('Updated permissions:', permissions);
  }, [permissions]);

  const options = [
    {
      titulo: "Módulos",
      opciones: [
        {
          nombre: "Usuarios",
          pantalla: "",
        },
        {
          nombre: "Polígonos Geográficos",
          pantalla: "",
        },
        {
          nombre: "Órdenes de trabajo",
          pantalla: "",
        },
        {
          nombre: "Monitores",
          pantalla: "",
        },
        {
          nombre: "Cajas",
          pantalla: "",
        },
        {
          nombre: "Lectura y Facturación",
          pantalla: "",
        },
        {
          nombre: "Configuración",
          pantalla: <ConfiguracionPermisos/>,
        },
      ]
    }
  ]

  return (
    <>
      {
        loading &&
        <Loader />
      }
      {
        !loading &&
        <ContextProviderPermisos>
          <div className='w-full h-[30px] flex justify-center border-b mb-[10px] border-border'><p>{rol.name != null && rol.name != "" ? <p className='text-primary'>{rol.name}</p>  : <p className="text-red-500">Selecciona Un Rol</p>}</p></div>
          <div className='max-h-[74vh]'>
            <div className='flex gap-2 h-full '>
              <div className='w-[300px] h-full'>
                <MenuLateral options={options} context={useStateContextPermisos} />
              </div>
              <div className='w-full  max-h-[65vh] h-[65vh] overflow-auto no-scrollbar'>
                <PantallaPermiso />
              </div>
            </div>
          </div>
        </ContextProviderPermisos>
      }

    </>

  )
}

export default Permisos