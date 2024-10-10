"use client"
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'

const DoubleContainer = ({ children }) => {
  return (
    <div className='h-full flex-grow px-1'>
      <div className='h-full flex w-full'>
        {children}
      </div>
    </div>
  );
};

const Seccion1 = ({ children, width = null }) => {

  const [isIconOpen, setIsIconOpen] = useState(false);

  const toggleTableContainer = () => {
    setIsIconOpen(!isIconOpen);
    let containers = document.getElementsByClassName('tableContainer');

    Array.from(containers).forEach((container) => {

      const currentState = container.getAttribute('data-state');

      if (currentState === 'open') {
        container.setAttribute('data-state', 'closed');
      } else {
        container.setAttribute('data-state', 'open');
      }
    });

  }

  return (
    <>
      <div data-state="open" 
      className={`flex ease-in-out overflow-hidden w-full border tableContainer data-[state=open]:md:w-[${width != null ? width :"30%"}] data-[state=closed]:w-0 duration-300 transition-all`}>
        {children}
      </div>
      <div className='w-[25px] border cursor-pointer bg-muted transition-all duration-200 flex items-center mr-3 justify-center'
        onClick={() => { toggleTableContainer() }}
      >
        <ArrowLeftIcon
          className={`${isIconOpen ? "transition-all rotate-180" : "transition-all "}`}
        />
      </div>
    </>
  );
};

const Seccion2 = ({ children }) => {
  return (
    <div data-state="open" className='overflow-hidden md:flex-grow data-[state=closed]:flex-grow data-[state=open]:w-0 h-full border tableContainer'>
      {children}
    </div>
  );
};

export { DoubleContainer, Seccion1, Seccion2 };
