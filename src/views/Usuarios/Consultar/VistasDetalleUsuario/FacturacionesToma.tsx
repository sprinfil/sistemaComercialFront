import React from 'react'
import { Button } from '../../../../components/ui/button'
import { DataTableFacturacionesToma, columns } from '../../../../components/ui/DataTableFacturacionesToma.tsx';
import { useFetchLecturas } from '../../../../lib/Services/GestionLecturasTomaService'
import Loader from '../../../../components/ui/Loader'
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario'

export const FacturacionesToma = () => {
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  //const { lecturas, loadingLecturas } = useFetchLecturas(usuariosEncontrados[0]?.tomas[0]?.id);
  return (
    <div className=''>
      <div className='w-full flex justify-between items-center'>
        <p className="text-[20px] font-medium">Facturaciones</p>
      </div>

      <div className='mt-5'>
        {
          // loadingLecturas ?
          //   <>
          //     <Loader />
          //   </>
          //   :
          //   <>
              <DataTableFacturacionesToma data={
                [
                  {
                    id: 1,
                    periodo: "Enero 2024",
                    total: 537
                  },
                  {
                    id: 1,
                    periodo: "Febrero 2024",
                    total: 625
                  },
                  {
                    id: 1,
                    periodo: "Marzo 2024",
                    total: 456
                  }
                ]
              } columns={columns} />
            // </>
        }
      </div>
    </div>
  )
}
