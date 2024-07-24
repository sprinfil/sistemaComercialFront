import React from 'react';
import { useState, useEffect} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export const OcultarTable = ({ children, abierto = false, width = '460px', accion}) => {
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
        className={open ? ` hidden transition-all duration-500 rounded-md border border-border p-4 overflow-auto h-full ` : `transition-all duration-500 rounded-md border border-border  overflow-auto h-full px-2`}
        style={{width: open ? '0' : width }}
      >
        {children}
      </div>



      <div className='flex items-center h-full px-1 py-1 cursor-pointer bg-muted rounded-tr-md rounded-br-md' onClick={handleAbierto}>
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
