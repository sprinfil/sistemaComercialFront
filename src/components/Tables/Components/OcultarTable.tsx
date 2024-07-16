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
  }, [accion]);


  return (
    <div className='flex items-center'>
      <div
        className={`transition-all duration-500 rounded-md border border-border p-4 overflow-auto h-[75vh]`}
        style={{width: open ? '0' : width}}
      >
        {children}
      </div>


    <div className='flex items-center h-full' onClick={handleAbierto} >
      <div className='flex items-center justify-center px-1 py-1 rounded-md cursor-pointer'>
          {open ?(
            <ChevronLeftIcon className='w-[20px] h-[20px] hover:bg-primary/80 rounded-xl' />
          ) : (
            <ChevronRightIcon className='w-[20px] h-[20px] hover:bg-primary/80 rounded-xl' />
          )
          }
        </div>
    </div>
     
      
    </div>
  );
};
