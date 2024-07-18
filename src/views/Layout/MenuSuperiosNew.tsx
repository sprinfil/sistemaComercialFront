import React, { useEffect } from 'react'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ExitIcon, PersonIcon, GlobeIcon, ClipboardCopyIcon, DesktopIcon, BoxModelIcon, ReaderIcon, GearIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from '../../components/ui/mode-toggle'
import { ContextProvider, useStateContext } from '../../contexts/ContextProvider';
import { MouseEvent } from 'react';
import axiosClient from '../../axios-client';

export const MenuSuperiosNew = () => {
    const { setToken, setUser, user } = useStateContext();

    const logout = (e: MouseEvent<SVGSVGElement>): void => {
        e.preventDefault();
        axiosClient.post("/logout")
            .then(({ data }) => {
                setToken(null);
                setUser({});
            })
            .catch((error: any) => {
                console.error('Error during logout:', error);
            })
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get(`/users/${localStorage.getItem("user_id")}`);
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    const opciones = [
        {
            titulo: "Usuarios",
            icon: <PersonIcon />,
            opciones: [
                {
                    titulo: "Consulta Usuario",
                    descripcion: "Mira los detalles de los usuarios, consulta por número de toma o nombre de usuario",
                    route: "/proximamente",
                },
                {
                    titulo: "Contratos",
                    descripcion: "Genera un nuevo contrato",
                    route: "/proximamente"
                },
                {
                    titulo: "Crear Nuevo Usuario",
                    descripcion: "Registra un nuevo usuario.",
                    route: "/CrearUsuario"
                }
            ]

        },
        {
            titulo: "Poligonos Geograficos",
            icon: <GlobeIcon />,
            opciones: [
                {
                    titulo: "Ver poligonos",
                    descripcion: "Administra las posiciones geograficas de las rutas y libros.",
                    route: "/poligonos"
                },
            ]
        },
        {
            titulo: "Ordenes de Trabajo",
            icon: <ClipboardCopyIcon />,
            opciones: [
                {
                    titulo: "Generar Ordenes de Trabajo",
                    descripcion: "Genera ordenes para operadores de campo",
                    route: "/proximamente"
                },
                {
                    titulo: "Asignar Ordenes de Trabajo",
                    descripcion: "Asigna Ordenes de trabajo para operadores de campo",
                    route: "/proximamente"
                },
            ]
        },
        {
            titulo: "Monitores",
            icon: <DesktopIcon />,
            opciones: [
                {
                    titulo: "Monitores",
                    descripcion: "Haz consultas de cualquier entidad que necesites.",
                    route: "/proximamente"
                },
            ]
        },
        {
            titulo: "Cajas",
            icon: <BoxModelIcon />,
            opciones: [
                {
                    titulo: "Punto de venta",
                    descripcion: "Registra los pagos de los usuarios.",
                    route: "/proximamente"
                },
            ]
        },
        {
            titulo: "Lectura y Facturación",
            icon: <ReaderIcon />,
            opciones: [
                {
                    titulo: "Cargas de Trabajo",
                    descripcion: "Adminsitra las cargas de trabajo para los operadores de campo.",
                    route: "/proximamente"
                },
                {
                    titulo: "Anomalias",
                    descripcion: "Gestiona, Monitorea y valida Anomalias",
                    route: "/proximamente"
                },
                {
                    titulo: "Facturar",
                    descripcion: "Factura o Refactura",
                    route: "/proximamente"
                },
                {
                    titulo: "Monitor de Operadores de Campo",
                    descripcion: "Consulta el recorrido de los operadores de campo",
                    route: "/proximamente"
                },
            ]
        },
        {
            titulo: "Configuraciones",
            icon: <GearIcon />,
            opciones: [
                {
                    titulo: "Catálogos",
                    descripcion: "Gestiona los catálogos del sistema.",
                    route: "/catalogos"
                },
                {
                    titulo: "Operadores del Sistema",
                    descripcion: "Gestiona Operadores de sistema, También sus roles y permisos.",
                    route: "/operadores"
                },
                {
                    titulo: "Roles",
                    descripcion: "Gestiona los roles del sistema.",
                    route: "/roles"
                },
                {
                    titulo: "Configuraciones Generales",
                    descripcion: "Opciones Adicionales.",
                    route: "/proximamente"
                },
                {
                    titulo: "Tarifa",
                    descripcion: "Consulta y gestiona las tarifas.",
                    route: "/Tarifa"
                },

            ]
        },

    ]

    return (
        <div className='relative'>
            <Menubar>
                {opciones.map((opcion, index) => (
                    <MenubarMenu>
                        <MenubarTrigger><div className='flex gap-2 items-center'> <span className='text-primary'> {opcion.icon}</span>{opcion.titulo}</div></MenubarTrigger>
                        <MenubarContent>
                            {opcion.opciones.map((opcion, key) => (
                                <>
                                    <Link to={opcion.route} key={index}>
                                        <MenubarItem>
                                            <div key={key} className='hover:hover:bg-accent p-3 rounded-md hover:cursor-pointer ease-in duration-100'>
                                                <div key={key} className="mb-1 text-[12px] font-medium">
                                                    {opcion.titulo}
                                                </div>
                                                <p key={key} className="text-[12px] leading-tight text-muted-foreground">
                                                    {opcion.descripcion}
                                                </p>
                                            </div>

                                            {/*<MenubarShortcut>⌘T</MenubarShortcut>*/}
                                        </MenubarItem>
                                    </Link>

                                </>
                            ))}
                        </MenubarContent>
                    </MenubarMenu>
                ))}

            </Menubar>
            <div className=' h-full w-[200px] absolute right-5 flex items-center top-0  justify-center gap-3'>
                <div className=' px-2 py-1 rounded-md hover:bg-accent cursor-pointer ease-in duration-100' onClick={logout} >
                    <ExitIcon className="w-[20px] h-[20px] rotate-180 text-red-500" />
                </div>
                <p className='text-[12px]'>{user.name}</p>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <ModeToggle />
            </div>
        </div>
    )
}