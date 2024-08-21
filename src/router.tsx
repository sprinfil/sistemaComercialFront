import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Auth/Login';
import DefaultLayout from './views/Layout/DefaultLayout';
import GuestLayout from './views/Layout/GuestLayout';
import NotFound from './views/Layout/NotFound';
import DashBoard from './views/Layout/DashBoard';
import Catalogos from './views/Configuraciones/Catalogos/Catalogos';
import Poligonos from './views/PoligonosGeograficos/Poligonos';
import { Proximamente } from './views/Layout/Proximamente';
import  DetalleUsuario  from './views/Usuarios/Consultar/DetalleUsuario';
import CrearUsuarioNuevo from './views/Usuarios/Crear/CrearUsuarioNuevo';
import Roles from './views/Configuraciones/Roles/Roles';
import Operadores from  './views/Configuraciones/Operadores/Operadores'
import { Tarifa } from './views/Configuraciones/Tarifa/Tarifa';
import App from './views/Cajas/Cajas';
import { ContratacionBuscarUsuario } from './views/Usuarios/Contratos/ContratacionBuscarUsuario';
import BuscarUsuario from './views/Usuarios/Consultar/BuscarUsuario';
import { CrearContratoForm } from './views/Usuarios/Contratos/FormsContratos/CrearContratoForm';
import { TomaUsuarioDetalle } from './views/Usuarios/Consultar/TomaUsuarioDetalle';
import { FondoCajaProvider } from './contexts/FondoCajaContext';
const router = createBrowserRouter ([
    {
        path:'/',
        element: <DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path:'/dashboard',
                element: <DashBoard/>
            },
            {
                path:'/catalogos',
                element: <Catalogos/>
            },
            {
                path:'/operadores',
                element: <Operadores/>
            },
            {
                path:'/roles',
                element: <Roles/>
            },
            {

                path:'/poligonos',
                element: <Poligonos/>
            },
            {
                path:'/proximamente',
                element: <Proximamente/>
            },
            {
                path:'/usuario',
                element: <DetalleUsuario/>
            },
            {
                path:'/CrearUsuario',
                element: <CrearUsuarioNuevo/>
            },
            {
                path:'/Tarifa',
                element: <Tarifa/>
            },

            {
                path:'/Contratacion',
                element: <ContratacionBuscarUsuario/>
            },
            {
                path:'/Buscar/Usuario',
                element: <BuscarUsuario/>
            },
            {
                path:'/Crear/Contrato/Usuario',
                element: <CrearContratoForm/>
            },
            {
                path:'/usuario/toma',
                element: <TomaUsuarioDetalle/>
            },
        ]
    },
    {
        path:'/Cajas',
        element: <App/>
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element: <Login/>
            },
        ]
    },

    {
        path:'*',
        element: <NotFound/>
    },
])
export default router;
