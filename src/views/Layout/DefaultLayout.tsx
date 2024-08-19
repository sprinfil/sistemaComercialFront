import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import MenuSuperior from './MenuSuperior';
import logo from "../../img/logo.png"
import { MenuSuperiosNew } from './MenuSuperiosNew';
import {subMenuZustand} from "../../contexts/ZustandSubmenu.tsx"

const DefaultLayout = () => {

  const { token } = useStateContext();
  const {titulo, icono} = subMenuZustand();

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <div className='h-[90vh]'>

      <section>
        {/*Menu Superior*/}
        <MenuSuperiosNew />
        <div className=' h-[30px] w-full bg-gradient-to-r bg-muted  text-[10px] flex items-center px-2 border-border border mb-[5px] gap-2'> <span className='text-primary' dangerouslySetInnerHTML={{ __html: localStorage.getItem("submenu_icono") }}></span> <p>{ localStorage.getItem("submenu_titulo") }</p></div>
        {/*  */}
        {/*<MenuSuperior />*/}
      </section>
      <main className='overflow-auto h-full max-h-[84vh] px-5'>
     
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout