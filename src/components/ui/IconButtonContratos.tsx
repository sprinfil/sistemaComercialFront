import React, { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  title?: string;
}

const IconButtonContratos = ({ children, onClick, title }: IconButtonProps) => {
  return (
    <div
      className="flex items-center justify-center px-2 py-2 rounded-md hover:bg-green-600 cursor-pointer ease-in duration-100"
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  );
};

export default IconButtonContratos;
