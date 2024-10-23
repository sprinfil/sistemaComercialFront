import React from 'react'
import { DataTableConsumos, columns } from '../../../components/ui/DataTableConsumos.tsx';

export const Consumos = ({selectedToma, detalle}) => {
  return ( 
    <div className='px-2'>
      <DataTableConsumos selectedToma={selectedToma} detalle={detalle}/>
    </div>
  )
}
