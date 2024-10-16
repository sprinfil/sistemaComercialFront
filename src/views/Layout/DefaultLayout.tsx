import React, {useEffect,useState} from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate, Outlet} from 'react-router-dom';
import MenuSuperior from './MenuSuperior';
import logo from "../../img/logo.png"
import { MenuSuperiosNew } from './MenuSuperiosNew';
import { subMenuZustand } from "../../contexts/ZustandSubmenu.tsx"
import { useNavigate } from 'react-router-dom';
import ModalContinuarProcesoContratacion from '../../components/ui/ModalContinuarProcesoContratacion.tsx';
const DefaultLayout = () => {

  const { token, server_status } = useStateContext();
  const { titulo, icono } = subMenuZustand();

  const navigate = useNavigate();
  const [abrirModal,setAbrirModal] = useState(false);


  useEffect(() => {
    const procesoPendiente = localStorage.getItem('contrato');
    console.log(localStorage.getItem('contrato'));
    if (procesoPendiente != null) {
      console.log("proceso pendieente");
      setAbrirModal(true); // Abre el modal
    }
  }, []);




  if (!token) {
    return <Navigate to="login" />
  }



  return (
    <div className='h-[90vh]'>
      <>
        <section>
          {/*Menu Superior*/}
          <MenuSuperiosNew />
          {/* <div className=' h-[30px] w-full bg-gradient-to-r bg-muted  text-[10px] flex items-center px-2 border-border border mb-[5px] gap-2'> <span className='text-primary' dangerouslySetInnerHTML={{ __html: localStorage.getItem("submenu_icono") }}></span> <p>{localStorage.getItem("submenu_titulo")}</p></div> */}
          {/*  */}
          {/*<MenuSuperior />*/}
        </section>
        <main className='h-full max-h-[84vh]'>
          <Outlet />
        </main>
            <ModalContinuarProcesoContratacion
          open={abrirModal}
          setOpen={setAbrirModal}/>
      </>
    </div>
  )
}

export default DefaultLayout