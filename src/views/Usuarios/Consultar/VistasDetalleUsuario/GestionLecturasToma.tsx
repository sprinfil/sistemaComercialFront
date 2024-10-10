import React from 'react'
import { Button } from '../../../../components/ui/button'
import { DataTableGestionLecturasToma, columns } from '../../../../components/ui/DataTableGestionLecturasToma.tsx';
import { useFetchLecturas } from '../../../../lib/Services/GestionLecturasTomaService'
import Loader from '../../../../components/ui/Loader'
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario'

export const GestionLecturasToma = () => {
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const { lecturas, loadingLecturas } = useFetchLecturas(usuariosEncontrados[0]?.tomas[0]?.id);
  return (
    <div className=''>
      <div className='w-full flex justify-between items-center'>
        <p className="text-[20px] font-medium">Facturaciones</p>
        {/* <Button>Nueva Lectura</Button> */}
      </div>

      <div className='mt-5'>
        {
          loadingLecturas ?
            <>
              <Loader />
            </>
            :
            <>
              <DataTableGestionLecturasToma data={lecturas} columns={columns} />
            </>
        }
      </div>
    </div>
  )
}
