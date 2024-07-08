import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import MenuSuperior from './MenuSuperior';

const DefaultLayout = () => {

  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <div className='h-[90vh]'>
      <section>
        {/*Menu Superior*/}
        <MenuSuperior/>
      </section>
      <main className= ' px-4 overflow-auto h-full'>
          {/*Contenido principal*/}
          <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout