import { useEffect, useState } from 'react';
import { DataTableColoniaCalleNew } from '../../ui/DataTable Colonias/DataTableColoniasCallesNew.tsx';
import { columns, ColoniaCalleDetalle } from "../../../components/Tables/Columns/ColoniaCalleDetalleColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextColonia.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { AgregarColoniaCalle } from './AgregarColoniaCalle.tsx';

export default function ColoniaCalleNewTable({ tipoColonia}) {

  const { setColonias, loadingTable, setLoadingTable, setAccion, setColonia, tipoColonias, setTipoColonias, colonia } = useStateContext();
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getColoniaDetalle();
  }, [colonia]);

  const getColoniaDetalle = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/callesPorColonia/${colonia.id}`);
      //setLoadingTable(false)
      console.log(response);
      let temp = [];
      let ctr = 0;
      response.data.forEach(calles => {
        if (calles.id_tipo_colonia == tipoColonia) {
          temp[ctr] = calles;
          ctr = ctr + 1;
        }
      });
      setNewData(temp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch calle:", error);
    }

    
    


  }


  const handleRowClick = (anomalia: ColoniaCalleDetalle) => {
    //setAnomalia(anomalia);
    //setAccion("ver");
  };


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (
    <>
      {
        loading &&
        <Loader />
      }
      {
        !loading &&
        <div className='w-full'>
          <div onClick={() => { setAccion("crear") }}>
            <div className='flex gap-2 items-center w-full'>
              <AgregarColoniaCalle trigger={
                <div onClick={() => { setAccion("") }}>
                  <IconButton>
                    <div className='flex gap-5 items-center'>
                      <div className=''>Agregar nueva calle para la colonia</div>
                      <PlusCircledIcon className='w-[20px] h-[20px]' />
                    </div>
                  </IconButton>
                </div>
              } id_tipo_colonia={tipoColonia}
                updateData={getColoniaDetalle}
              />
            </div>
          </div>

          <DataTableColoniaCalleNew columns={columns} data={newData}  sorter="nombre" onRowClick={handleRowClick} updateData={getColoniaDetalle} />
        </div>
      }

    </>

  );
}