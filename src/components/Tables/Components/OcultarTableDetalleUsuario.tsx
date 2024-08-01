import React from 'react';
import { useState, useEffect} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export const OcultarTableDetalleUsuario = ({ children, abierto = false, width = '300px', accion}) => {
  const [open, setOpen] = useState(abierto);
  
  console.log('Accion:', accion);

  const handleAbierto = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (accion === 'crear') {
      setOpen(true); 
    }
    if (accion === 'creado') {
      setOpen(false); 
    }
  }, [accion]);


  return (
    <div className='flex items-center'>
      
      <div
        className={open ? ` transition-all duration-300 rounded-md overflow-auto min-h-[81vh] h-[81vh] w-[0px] opacity-0` : `transition-all duration-300 rounded-md  overflow-auto max-h-[81vh] h-[81vh]`}
        style={{width: open ? '0' : width }}
      >
        {children}
      </div>



      <div className='flex items-center px-1 py-1 cursor-pointer bg-muted rounded-tr-md rounded-br-md h-[81vh]' onClick={handleAbierto}>
        {open ? (
          <ChevronRightIcon className='w-[20px] h-[20px] rounded-xl  cursor-pointer' />
        ) : (
          <ChevronLeftIcon className='w-[20px] h-[20px] rounded-xl  cursor-pointer' />
        )
        }
      </div>


    </div>
  );
};
