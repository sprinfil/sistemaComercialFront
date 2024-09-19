import React from 'react'
import IconButton from '../../../../components/ui/IconButton'
import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from '../../../../components/ui/button'
import ModalCrearDescuento from '../../../../components/ui/ModalCrearDescuento'

export const GestionDescuentos = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <p className='font-medium text-[20px]'>Descuentos</p>
        <ModalCrearDescuento trigger={<Button>Nuevo Descuento</Button>} />
      </div>
    </div>
  )
}
