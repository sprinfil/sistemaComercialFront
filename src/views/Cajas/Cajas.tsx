import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PrintButton from '../../components/Tables/Components/PrintButtom';
import { ExitIcon, PersonIcon, GlobeIcon, ClipboardCopyIcon, DesktopIcon, BoxModelIcon, ReaderIcon, GearIcon } from '@radix-ui/react-icons';
import IconButton from '../../components/ui/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from '../../components/ui/mode-toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContextProvider, useStateContext } from '../../contexts/ContextProvider';
import FechaHora from '../Layout/FechaHora';
import PuntoVenta from './PuntoVenta';
import RetirosCaja from './RetirosCaja';
import ConfigurarCaja from './ConfigurarCaja';
import CorteCaja from './CorteCaja';
import { FondoCajaProvider } from '../../contexts/FondoCajaContext';
import axiosClient from '../../axios-client';

function App() {

    const { setToken, setUser, user, permissions, setPermissions } = useStateContext();
    const [activeTab, setActiveTab] = useState("Punto de Venta");
    const navigate = useNavigate(); // Hook para redirigir al usuario


    const handleExitClick = () => {
      // Limpiar localStorage
      localStorage.removeItem('isFondoCajaRegistered');
      localStorage.removeItem('fondoCajaAmount');

      // Redirigir al usuario a la página principal
      navigate("/dashboard");
    };

    

    const opciones = [
        {
          titulo: "Punto de Venta",
          componente: <PuntoVenta/>
        },

        {
            titulo: "Cortes de Caja",
            componente: <CorteCaja/>
          },
      ]


    return (
        <div>
            <div className=' bg-muted w-full h-[7vh] flex items-center px-2 relative border-b border-border'>
                <a title='Modulo Principal' onClick={handleExitClick}>
                    <Link to={"/dashboard"}>
                        <IconButton >
                            <ExitIcon className='w-[20px] h-[20px] rotate-180' />
                            <div className='ml-[10px]'><p>Volver</p></div>
                        </IconButton>
                    </Link>
                </a>
                <div className='absolute right-2 flex gap-5 items-center '>
                    <nav>
                      {/* Otros elementos del menú */}
                      <FechaHora />
                    </nav>
                    <p>Caja 10</p>
                    <p>{user.name}</p>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ModeToggle/>
                </div>
            </div>
            <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                {opciones.map((opcion, index) => (
                  <>
                    <TabsTrigger value={opcion.titulo} key={index}>{opcion.titulo}</TabsTrigger>
                  </>
                ))}
              </TabsList>
              {opciones.map((opcion, index) => (
                <>
                  <TabsContent value={opcion.titulo} key={index}>{opcion.componente}</TabsContent>
                </>
              ))}
            </Tabs>
            </div>
        </div>
    );
}

export default App;
