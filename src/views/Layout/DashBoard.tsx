import React from 'react'
import EnDesarrollo from "../../img/en_desarrollo.svg";
import Void from "../../img/notFound.svg";

const DashBoard = () => {

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-20'>
      <p>Selecciona una opción del menú.</p>
      <img src={Void} className='w-[50vh]' />
    </div>
  )
}

export default DashBoard