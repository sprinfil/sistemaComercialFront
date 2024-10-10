import React, { useState, useEffect } from 'react';
import { ExitIcon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from '../../components/ui/mode-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from '../../contexts/ContextProvider';
import FechaHora from '../Layout/FechaHora';
import PuntoVenta from './PuntoVenta';
import CorteCaja from './CorteCaja';
import IconButton from '../../components/ui/IconButton';
import axiosClient from '../../axios-client';
import ZustandPuntoVenta from '../../contexts/ZustandPuntoVenta';

function App() {
    const { user } = useStateContext();
    const [activeTab, setActiveTab] = useState("Punto de Venta");
    const [cajaNombre, setCajaNombre] = useState("");
    const [nombreOperador, setNombreOperador] = useState(""); // Estado para almacenar el nombre de la caja
    const navigate = useNavigate();
    const { set_session_caja, session_caja } = ZustandPuntoVenta();

    useEffect(() => {
        const fetchCajaNombre = async () => {
            try {
                if (!session_caja.fondo_inicial) {
                    const response = await axiosClient.get("/cajas/estadoSesionCobro?id_sesion_caja", {
                        params: {
                            id_sesion_caja: null
                        },
                    });
                    const { caja_nombre } = response.data;
                    console.log(response.data);
                    set_session_caja(response.data);
                    setCajaNombre(caja_nombre); // Almacenar el nombre de la caja en el estado
                }
            } catch (error) {
                console.error("Error al obtener el nombre de la caja:", error);
            }
        };

        fetchCajaNombre(); // Llamada a la función para obtener el nombre de la caja
    }, []);

    useEffect(() => {
        setNombreOperador(session_caja.nombre_operador);
        setCajaNombre(session_caja.caja_nombre)
    }, [session_caja])

    const handleExitClick = () => {
        navigate("/dashboard");
    };

    const opciones = [
        {
            titulo: "Punto de Venta",
            componente: <PuntoVenta />
        },
        // {
        //     titulo: "Cortes de Caja",
        //     componente: <CorteCaja />
        // },
    ];

    return (
        <div>
            <div className='bg-muted w-full h-[7vh] flex items-center px-2 relative border-b border-border'>
                <a title='Módulo Principal' onClick={handleExitClick}>
                    <Link to={"/dashboard"}>
                        <IconButton>
                            <ExitIcon className='w-[20px] h-[20px] rotate-180' />
                            <div className='ml-[10px]'><p>Volver</p></div>
                        </IconButton>
                    </Link>
                </a>
                <div className='absolute right-2 flex gap-5 items-center'>
                    <nav>
                        <FechaHora />
                    </nav>
                    <p>{cajaNombre}</p> {/* Mostrar el nombre de la caja */}
                    <p>{nombreOperador}</p>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ModeToggle />
                </div>
            </div>
            <div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        {opciones.map((opcion, index) => (
                            <TabsTrigger value={opcion.titulo} key={index}>{opcion.titulo}</TabsTrigger>
                        ))}
                    </TabsList>
                    {opciones.map((opcion, index) => (
                        <TabsContent value={opcion.titulo} key={index}>{opcion.componente}</TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

export default App;
