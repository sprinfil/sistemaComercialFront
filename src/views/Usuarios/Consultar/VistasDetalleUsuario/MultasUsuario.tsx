import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { FaMoneyCheckAlt } from "react-icons/fa";
import ModalAgregarMulta from '../../../../components/ui/ModalAgregarMulta';
import { DataTableMultas } from '../../../../components/ui/DataTableMultas';
import { Multas, columns } from '../../../../components/Tables/Columns/MultasColumns';
import axiosClient from '../../../../axios-client';
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario';
export const MultasUsuario = () => {


  const {usuariosEncontrados} =  ZustandGeneralUsuario();




    const [abrirModal, setAbrirModal] = useState(false);

    const [data, setData] = useState([]);
    const handleAbrirModal = () => {
        setAbrirModal(true);
    }

    useEffect(() => {
      getMultas();
      }, []);
    
      const getMultas = async () => {
        //setLoadingTable(true);
        try {
          const response = await axiosClient.get("/multa/consultarmultas", {
            params:{
            codigo_usuario : usuariosEncontrados[0]?.codigo_usuario

            }
          });
         // setLoadingTable(false);
          setData(response.data.data);
          console.log(response);
        } catch (error) {
          //setLoadingTable(false);
          console.error("Failed to fetch multas:", error);
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
