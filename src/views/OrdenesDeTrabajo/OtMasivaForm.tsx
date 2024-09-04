import React, { useState } from 'react'
import IconButton from '../../components/ui/IconButton'
import { MdContentPasteSearch } from 'react-icons/md'
import OrdenDeTrabajoCrearTomasTable from '../../components/Tables/Components/OrdenDeTrabajoCrearTomasTable'
import ModalGenerarOrdenDeTrabajo from '../../components/ui/ModalGenerarOrdenDeTrabajo'
import { Button } from '../../components/ui/button'
import { FaSearch } from 'react-icons/fa'
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt'
import axiosClient from '../../axios-client'
export const OtMasivaForm = () => {




  const { isAsignadaChecked, setIsAsignadaChecked, isNoAsignadaChecked, setIsNoAsignadaChecked,
    setInformacionRecibidaPorFiltros, informacionRecibidaPorFiltros, arregloOrdenesDeTrabajoParaAsignarAOperador, setLoadingTable, loadingTable} = ZustandFiltrosOrdenTrabajo();


    const [abrirModal, setAbrirModal] = useState(false);









    function handleGenerarOrdenDeTrabajo()
    {
        setAbrirModal(true);
    }


//METODO DE FILTRACION PARA CONSEGUIR LAS ORDENES DE TRABAJO Y PODER ASIGNARLAS
    const getOrdenesDeTrabajo = async () => {
      setLoadingTable(true);
      const values = {
        asignada: isAsignadaChecked,
        no_asignada: isNoAsignadaChecked,
      }
      console.log("VALORES ENVIADOS", values);
      try {
        const response = await axiosClient.post("OrdenTrabajo/filtros", values);
        console.log(response);


        if (Array.isArray(response.data.ordenes_trabajo)) {
          const tomas = response.data.ordenes_trabajo.map((item: any) => item.toma);

          console.log("Tomas extraídas", tomas);
          setLoadingTable(false);

          setInformacionRecibidaPorFiltros(tomas);
        } else {
          console.log("No jala", response.data.ordenes_trabajo);
        }

      } catch (error) {
        setLoadingTable(false);
        console.error("Failed to fetch anomalias:", error);
      }
    };









  return (
    <div className='w-full'>

    <div className='border border-border rounded p-5  mr-10 shadow-sm'>
      <div className='flex space-x-2'>
      <p className="text-xl text-[20px] mr-[100vh] font-medium">Generar ordenes de trabajo masivas</p>
        <div className='flex items-center ml-[2vh]' title='Seleccionar orden de trabajo'>
            
            <IconButton onClick={handleGenerarOrdenDeTrabajo}><MdContentPasteSearch className='w-[4vh] h-[4vh]'/></IconButton>
            </div>
      </div>
      
      <div className=''>
      <p className="text-[20px] mt-5 ">
          <div className='flex space-x-2'>
          <h2 className="text-[20px]">
          Filtrar
        </h2>
          <div className='w-[5vh]' onClick={getOrdenesDeTrabajo}>
          <IconButton title="Buscar">
          <FaSearch />
        </IconButton>
          </div>
          
            </div>
      
        </p>

      </div>
      
         
            <div>
            <OrdenDeTrabajoCrearTomasTable/>
            </div>

            <ModalGenerarOrdenDeTrabajo
            isOpen={abrirModal}
            setIsOpen={setAbrirModal}
            method={""}
            tipoOperacion={"masiva"}
            />

            <div className='flex justify-end'>

            </div>

        </div>

    </div>
  )
}
