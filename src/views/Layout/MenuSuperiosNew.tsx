import React, { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server';
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
} from "@/components/ui/menubarSapa"
import { ExitIcon, PersonIcon, GlobeIcon, ClipboardCopyIcon, DesktopIcon, BoxModelIcon, ReaderIcon, GearIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from '../../components/ui/mode-toggle'
import { ContextProvider, useStateContext } from '../../contexts/ContextProvider';
import { MouseEvent } from 'react';
import axiosClient from '../../axios-client';
import { subMenuZustand } from "../../contexts/ZustandSubmenu.tsx"
import { Skeleton } from "@/components/ui/skeleton"
import logo_menu from "../../img/logosapamenusuperiornew.png"


export const MenuSuperiosNew = () => {
    const { setToken, setUser, user, permissions, setPermissions, setServerStatus } = useStateContext();
    const { set_titulo, set_icono, titulo } = subMenuZustand();
    const [loading_permissions, set_loading_permissions] = useState(true);
    const [selectedOption, setSelectedOption] = useState("");

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
        fetchUser();
    }, []);

    useEffect(() => {
        getPermissions();
    }, []);


    //obtener los permisos del usuario
    const getPermissions = async () => {
        set_loading_permissions(true);
        try {
            const response = await axiosClient.get(`/Rol/get_all_permissions_by_user_id/${user.id}`);
            setPermissions(response.data);
            set_loading_permissions(false)
        } catch (error) {
            console.error("Failed to fetch anomalias:", error);
            set_loading_permissions(false)
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axiosClient.get(`/users/${localStorage.getItem("user_id")}`);
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setServerStatus(false);
        }
    };

    const handle_menu_trigger_click = (opcion, icono) => {
        set_titulo(opcion.titulo);
        set_icono(icono);
        const submenuIcono = ReactDOMServer.renderToString(icono);
        localStorage.setItem("submenu_titulo", opcion.titulo);
        localStorage.setItem("submenu_icono", submenuIcono);
        console.log(opcion)
    }

    useEffect((() => { console.log(titulo + " hola") }), [titulo])

    const opciones = [
        {
            titulo: "Usuarios",
            permission: "",
            icon: <PersonIcon />,
            opciones: [
                {
                    titulo: "Consulta Usuario",
                    descripcion: "Consulta los detalles de los usuarios, consulta por número de toma o nombre de usuario.",
                    route: "/Buscar/Usuario",
                    permission: ""
                },
                {
                    titulo: "Contratos",
                    descripcion: "Genera un contrato nuevo.",
                    permission: "",
                    route: "/Contratacion"
                },
                {
                    titulo: "Crear nuevo usuario",
                    descripcion: "Registra un nuevo usuario.",
                    route: "/CrearUsuario",
                    permission: ""
                }
            ]

        },
        {
            titulo: "Polígonos Geográficos",
            permission: "",
            icon: <GlobeIcon />,
            opciones: [
                {
                    titulo: "Ver polígonos",
                    descripcion: "Administra las posiciones geográficas de las rutas y libros.",
                    route: "/poligonos",
                    permission: ""
                },
            ]
        },
        {
            titulo: "Ordenes de Trabajo",
            permission: "",
            icon: <ClipboardCopyIcon />,
            opciones: [
                {
                    titulo: "Generar ordenes de trabajo",
                    descripcion: "Genera ordenes de trabajo para operadores de campo.",
                    route: "/crear/orden/masiva",
                    permission: ""
                },
              /*   {
                    titulo: "Asignar Ordenes de Trabajo",
                    descripcion: "Asigna Ordenes de trabajo para operadores de campo",
                    route: "/asignar/orden/masiva",
                    permission: ""
                }, */
            ]
        },
        {
            titulo: "Monitores",
            permission: "",
            icon: <DesktopIcon />,
            opciones: [
                {
                    titulo: "Monitores",
                    descripcion: "Haz consultas de cualquier entidad que necesites.",
                    route: "/monitores",
                    permission: ""
                },
            ]
        },
        {
            titulo: "Cajas",
            permission: "",
            icon: <BoxModelIcon />,
            opciones: [
                {
                    titulo: "Punto de venta",
                    descripcion: "Registra los pagos de los usuarios.",
                    route: "/cajas",
                    permission: ""
                },
            ]
        },
        {
            titulo: "Lectura y Facturación",
            permission: "",
            icon: <ReaderIcon />,
            opciones: [
                {
                    titulo: "Periodos de facturación",
                    descripcion: "Adminsitra todo el proceso de facturación.",
                    route: "/periodosFacturacion",
                    permission: ""
                },
            ]
        },
        {
            titulo: "Configuraciones",
            permission: "VerConfiguraciones",
            icon: <GearIcon />,
            opciones: [
                {
                    titulo: "Catálogos",
                    descripcion: "Gestiona los catálogos del sistema.",
                    route: "/catalogos",
                    permission: "VerCatalogos"
                },
                {
                    titulo: "Operadores del Sistema",
                    descripcion: "Gestiona los operadores del sistema (roles y permisos).",
                    route: "/operadores"
                    ,
                    permission: "VerOperadoresSistema"
                },
                {
                    titulo: "Roles",
                    descripcion: "Gestiona los roles del sistema.",
                    route: "/roles",
                    permission: ""
                },
                {
                    titulo: "Configuraciones Generales",
                    descripcion: "Opciones adicionales.",
                    route: "/proximamente",
                    permission: ""
                },
                {
                    titulo: "Tarifa",
                    descripcion: "Consulta y gestiona las tarifas.",
                    route: "/Tarifa",
                    permission: ""
                },
            ]
        },

    ]



    return (
        <>
            <p className='relative xl:hidden text-sm text-red-500 p-1 h-[9vh] flex items-center justify-center'>La resolucion no es compatible</p>
            <div className='relative hidden xl:block'>
                <Menubar>
                    {
                        loading_permissions &&
                        <>
                            <Skeleton className="ml-3 w-[70rem] h-[20px]" />
                        </>
                    }

                    {
                        !loading_permissions &&
                        <>
                            {/* <img src={logo_menu} className='w-[3vw] rounded-md shadow-md' alt=""/> */}
                            {opciones.map((opcionPadre, index) => {
                                if (permissions.includes(opcionPadre.permission) || user.id == 1 || user?.roles?.includes("Admin")) {
                                    return (

                                        <MenubarMenu>
                                            <MenubarTrigger
                                                className={`h-full transition-all duration-200 hover:p-4 cursor-pointer ${localStorage.getItem("selectedMenuOption") == opcionPadre.titulo || selectedOption == opcionPadre.titulo  ? "bg-primary text-white  ": " hover:bg-muted"}`}
                                                onClick={() => { }}>
                                                <div className='flex gap-2 items-center'> <span className={`${localStorage.getItem("selectedMenuOption") == opcionPadre.titulo || selectedOption == opcionPadre.titulo  ? " text-white  ": "text-primary"}`}> {opcionPadre.icon}</span>{opcionPadre.titulo}</div>
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                {opcionPadre.opciones.map((opcion, key) => {
                                                    if (permissions.includes(opcion.permission) || user.id == 1 || user?.roles?.includes("Admin")) {
                                                        return (
                                                            <>
                                                                <Link to={opcion.route} key={index}>
                                                                    <MenubarItem onClick={() => { handle_menu_trigger_click(opcion, opcionPadre.icon);localStorage.setItem("selectedMenuOption", opcionPadre.titulo); setSelectedOption(opcionPadre.titulo); }}>
                                                                        <div key={key} className=' hover:hover:bg-accent p-3 rounded-md hover:cursor-pointer ease-in duration-100'>
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
                                                        )
                                                    }
                                                })}
                                            </MenubarContent>
                                        </MenubarMenu>
                                    )
                                }
                            })}
                        </>
                    }


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
        </>

    )
}
