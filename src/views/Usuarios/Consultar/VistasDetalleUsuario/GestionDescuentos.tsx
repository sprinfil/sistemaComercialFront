import React, { useEffect, useState } from 'react'
import IconButton from '../../../../components/ui/IconButton'
import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from '../../../../components/ui/button'
import ModalCrearDescuento from '../../../../components/ui/ModalCrearDescuento'
import TomaDescuentosTable from '../../../../components/Tables/Components/TomaDescuentosTable'
import { columns } from '../../../../components/Tables/Columns/DescuentosTomaColumns'
import { DataTable } from "../../../../components/ui/DataTableTomaDescuentos.tsx"
import descuentoService from '../../../../lib/DescuentoService'
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario'
import Loader from '../../../../components/ui/Loader'
export const GestionDescuentos = () => {
  const { toma } = ZustandGeneralUsuario();
  const [open_modal, set_open_modal] = useState(false);
  const [descuentos_asociados, set_descuentos_asociados] = useState([]);
  const [loading, set_loading] = useState(false);

  useEffect(() => {
    get();
  }, [toma])

  useEffect(() => {
    console.log(descuentos_asociados);
  }, [descuentos_asociados])

  const get = async () => {
    if (toma) {
      set_loading(true);
      try {
        let data = await descuentoService.getDescuentosPorModelo("toma", toma?.id);
        set_descuentos_asociados(data);
        set_loading(false);
      } catch (err) {
        //error
        set_loading(false);
      }
    } else {

    }

  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <p className='font-medium text-[20px]'>Descuentos</p>
        <ModalCrearDescuento update_data={set_descuentos_asociados} open={open_modal} set_open={set_open_modal} trigger={<Button onClick={() => { set_open_modal(true) }}>Nuevo Descuento</Button>} />
      </div>

      <div className='mt-10'>
        {
          !loading ?
            <><DataTable columns={columns} data={descuentos_asociados} updateData={set_descuentos_asociados} /></>
            :
            <><Loader /></>
        }
      </div>

    </div>
  )
}
