import React, { useState } from 'react'
import IconButton from '../../components/ui/IconButton'
import { MdContentPasteSearch } from 'react-icons/md'
import OrdenDeTrabajoCrearTomasTable from '../../components/Tables/Components/OrdenDeTrabajoCrearTomasTable'
import ModalGenerarOrdenDeTrabajo from '../../components/ui/ModalGenerarOrdenDeTrabajo'
import { Button } from '../../components/ui/button'
import { FaSearch } from 'react-icons/fa'
import { SiGooglesearchconsole } from "react-icons/si";
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt'
import axiosClient from '../../axios-client'
export const OtMasivaForm = () => {




  const { isAsignadaChecked, setIsAsignadaChecked, isNoAsignadaChecked, setIsNoAsignadaChecked,
    setInformacionRecibidaPorFiltros, 
    informacionRecibidaPorFiltros,
     arregloOrdenesDeTrabajoParaAsignarAOperador, 
     setLoadingTable, loadingTable, 
     setInformacionRecibidaPorFiltrosGenerarOtMasiva,
     isConcluidaChecked, setIsConcluidaChecked,
     isCanceladaChecked, setIsCanceladaChecked,
     isDomesticaChecked, setIsDomesticaChecked,
     isComercialChecked, setIsComercialChecked,
     isIndustrialChecked, setIsIndustrialChecked,
     isEspecialChecked, setIsEspecialChecked,
     idLibroFiltro, idRutaFiltro,
     saldoMinFiltro, saldoMaxFiltro,
      informacionRecibidaPorFiltrosGenerarOtMasiva,loadingTablePonerOTMasivas, setLoadingTablePonerOTMasivas, setLoadingTableMonitor} = ZustandFiltrosOrdenTrabajo();


  const [abrirModal, setAbrirModal] = useState(false);









  function handleGenerarOrdenDeTrabajo() {
    setAbrirModal(true);
  }


  //METODO DE FILTRACION PARA CONSEGUIR LAS ORDENES DE TRABAJO Y PODER ASIGNARLAS
  const getOrdenesDeTrabajo = async () => {
    setLoadingTableMonitor(true);
    const values = {
      asignada: "",
      no_asignada: "",
      concluida: "",
      cancelada: "",
      domestica: isDomesticaChecked,
      comercial: isComercialChecked,
      industrial: isIndustrialChecked,
      especial: isEspecialChecked,
      ruta_id: idRutaFiltro,
      libro_id: idLibroFiltro,
      saldo_min: saldoMinFiltro,
      saldo_max: saldoMaxFiltro
    }
    console.log("VALORES ENVIADOS", values);
    try {
      const response = await axiosClient.post("Toma/tipo/", values);
      console.log(response);


      if (Array.isArray(response.data.tomas)) {
        const tomas = response.data.tomas.map((item: any) => item);

        console.log("Tomas extraídas", tomas);
        setLoadingTableMonitor(false);

        setInformacionRecibidaPorFiltrosGenerarOtMasiva(tomas);
      } else {
        console.log("No jala", response.data.ordenes_trabajo);
      }

    } catch (error) {
      setLoadingTableMonitor(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  return (
    <div className='w-full'>

      <div className='border border-border rounded p-5 h-[78vh] overflow-auto mr-10 shadow-sm '>
        <div className='flex space-x-2  relative'>
          <p className="text-xl text-[20px] font-medium">Generar ordenes de trabajo masivas</p>
          <div className='flex items-center ml-[2vh] absolute right-2' title='Seleccionar orden de trabajo'>
            <IconButton onClick={handleGenerarOrdenDeTrabajo}><SiGooglesearchconsole className='w-[4vh] h-[4vh]' /></IconButton>
          </div>
        </div>

        <div className=''>
          <p className="text-[20px] mt-5 ">
            <div className='flex space-x-2'>
              
              <div className='w-[5vh] bg-muted rounded-lg' onClick={getOrdenesDeTrabajo}>
                <IconButton title="Buscar">
                  <FaSearch />
                </IconButton>
              </div>

            </div>

          </p>

        </div>


        <div>
          <OrdenDeTrabajoCrearTomasTable />
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
