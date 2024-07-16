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
        style={{width: open ? '0' : width }}
      >
        {children}
      </div>



      <div className='px-1 py-1 rounded-md cursor-pointer' onClick={handleAbierto}>
        {open ?(
          <ChevronLeftIcon className='w-[20px] h-[20px]' />
        ) : (
          <ChevronRightIcon className='w-[20px] h-[20px]' />
        )
        }


        
      </div>
    </div>
  );
};
