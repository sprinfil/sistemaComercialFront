import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { FaMoneyCheckAlt } from "react-icons/fa";
import ModalAgregarMulta from '../../../../components/ui/ModalAgregarMulta';
import { DataTableMultas } from '../../../../components/ui/DataTableMultas';
import { Multas, columns } from '../../../../components/Tables/Columns/MultasColumns';
import axiosClient from '../../../../axios-client';
export const MultasUsuario = () => {

    const [abrirModal, setAbrirModal] = useState(false);

    const [data, setData] = useState([]);
    const handleAbrirModal = () => {
        setAbrirModal(true);
    }

    useEffect(() => {
        getAnomalias();
      }, []);
    
      const getAnomalias = async () => {
        //setLoadingTable(true);
        try {
          const response = await axiosClient.get("/AnomaliasCatalogo");
         // setLoadingTable(false);
          setData(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          //setLoadingTable(false);
          console.error("Failed to fetch anomalias:", error);
        }
      };
    

  return (
    <div>

        <div className='flex justify-end p-5'>
            <Button onClick={handleAbrirModal}>
            <FaMoneyCheckAlt className='mr-2' />
            Crear multa
            </Button>
        </div>

        <div>
            <DataTableMultas columns={columns} data={data} />
        </div>

        <ModalAgregarMulta open={abrirModal} setIsOpen={setAbrirModal}/>
    </div>
  )
}
