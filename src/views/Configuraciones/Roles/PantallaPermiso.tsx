import React, { useEffect, useState } from 'react'
import { useStateContextPermisos } from '../../../contexts/ContextDetallePermisos';
import ConfiguracionPermisos from './VistaIndividualPermiso/ConfiguracionPermisos';
import { useStateContext } from '../../../contexts/ContextRol';
import Modal from '../../../components/ui/Modal';
import { Alerta } from '../../../components/ui/Alerta';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST


export const PantallaPermiso = () => {
  const { toast } = useToast()
  const { pantalla, setPantalla, click} = useStateContextPermisos();
  const { editando, setEditando } = useStateContext();
  const [mostrarPantalla, setMostrarPantalla] = useState();

  function successToastCreado() {
    toast({
        title: "Cambios sin Guardar",
        description: "Guarda tus cambios antes de cambiar de pantalla",
        variant: "destructive",

    })
}

  useEffect(() => {
    if (!editando) {
      setMostrarPantalla(pantalla)
    } else {
      successToastCreado();
    }
  }, [click])

  return (
    <div className='w-full'>
      {mostrarPantalla}
    </div>
  )
}
