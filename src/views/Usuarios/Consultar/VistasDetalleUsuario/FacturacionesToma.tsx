import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { DataTableFacturacionesToma, columns } from '../../../../components/ui/DataTableFacturacionesToma.tsx';
import Loader from '../../../../components/ui/Loader'
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario'
import { getFacturacionesToma } from '../../../../lib/Services/FacturacionesToma.tsx';
import { useToast } from '../../../../components/ui/use-toast.ts';
export const FacturacionesToma = () => {
  const { toast } = useToast();
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const [loadingFacturaciones, setLoadingfacturaciones] = useState<Boolean>(true);
  const [facturaciones, setFacturaciones] = useState<Array<any>>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (error != "") {
      toast({
        title: "error",
        description: error,
        variant: "destructive"
      })
      setError("");
    }
  }, [error])
  getFacturacionesToma(setLoadingfacturaciones, setFacturaciones, usuariosEncontrados[0]?.tomas[0]?.id, setError);

  return (
    <div className=''>
      <div className='w-full flex justify-between items-center'>
        <p className="text-[20px] font-medium">Facturaciones</p>
      </div>

      <div className='mt-5'>
        {
          loadingFacturaciones ?
            <>
              <Loader />
            </>
            :
            <>
              {
                facturaciones.length > 0 ?
                  <>
                    <DataTableFacturacionesToma data={
                      [
                        facturaciones
                      ]
                    } columns={columns} />
                  </>
                  :
                  <>No hay facturaciones.</>
              }
            </>
        }
      </div>
    </div>
  )
}
