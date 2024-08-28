import React from 'react'
import { FiFilter } from "react-icons/fi";

const FiltrosAsignarOTMasiva = () => {
  return (
    <div className='w-[70vh]'>

      <div className='border border-shadow ml-5 mt-5 h-full p-5'>

        <div className='flex space-x-2'>
          <div>
          <FiFilter className='w-[3vh] h-[3vh]'/>
          </div>
          <div>
          Filtros

          </div>
        </div>

      </div>

    </div>
  )
}

export default FiltrosAsignarOTMasiva