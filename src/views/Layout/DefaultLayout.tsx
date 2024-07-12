import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import MenuSuperior from './MenuSuperior';
import logo from "../../img/logo.png"

const DefaultLayout = () => {

  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <div className='h-[90vh]'>
      <section>
        {/*Menu Superior*/}
        <MenuSuperior />
      </section>
      <main className=' px-4 overflow-auto h-full '>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout