import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IconButton from '../../components/ui/IconButton'
import { FaSave } from "react-icons/fa";
import IconButtonCargaTrabajo from '../../components/ui/IconButtonCargaTrabajo';
import { TipoDeCarga } from './TipoDeCarga';
import { IoMdPrint } from "react-icons/io";
import axiosClient from '../../axios-client';
import { ZustandCargaDeTrabajo } from '../../contexts/ZustandCargaDeTrabajo';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { Pencil1Icon } from '@radix-ui/react-icons';
import Loader from '../../components/ui/Loader';
import LoaderChico from '../../components/ui/LoaderChico';
import { getCargaLectura } from '../../lib/Services/CargaLecturaService';
import { CargaLecturaDataTable } from '../../components/Tables/Components/CargaLecturaTable';
import { DoubleContainer, Seccion1, Seccion2 } from '../../components/ui/DoubleContainer';


export const CargasTrabajo = ({ detalle }) => {
  const { toast } = useToast()
  const { filasSeleccionadaCargaTrabajo, cargasDeTrabajoAEnviar, setCargasDeTrabajoAEnviar, setFilasSeleccionadaCargaTrabajo, dataInfoCargaTrabajo, setDataInfoCargaTrabajo,
    cargasDeTrabajoAEnviarAPI, setLoadingTable } = ZustandCargaDeTrabajo();
  const [activeTab, setActiveTab] = useState("tipoDeCarga");
  const [editar, setEditar] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(detalle);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      setLoadingTable(true);
      try {
        const response = await axiosClient.get(`cargaTrabajo/show/${detalle?.id}`);
        console.log(response.data.cargas_trabajo); // Asegúrate de acceder a los datos que necesitas
        setData(response.data.cargas_trabajo);
        setCargasDeTrabajoAEnviar(response.data.cargas_trabajo);
        setLoadingTable(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [detalle?.id]);

  // console.log(cargasDeTrabajoAEnviarAPI);

  const handleEnviarCargaDeTrabajo = async () => {
    setLoading(true);
    const values2 =
    {
      cargas_trabajo:
        cargasDeTrabajoAEnviarAPI

    }
    console.log(values2);

    try {
      const response = await axiosClient.put("cargaTrabajo/update", values2);
      console.log(response)
      toast({
        title: "¡Éxito!",
        description: "La carga de trabajo se ha creado correctamente",
        variant: "success",

      })
      setEditar(false);
      setLoading(false);

    }
    catch (response) {
      console.log(response.response.data.error)
      const message = response.response.data.error;

      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: message,
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
      setLoading(false);
    }
  }

  const handleEditar = () => {
    setEditar(true);
  }


  const { setMultas } = getCargaLectura(setDataInfoCargaTrabajo, detalle?.id);
  // console.log(dataInfoCargaTrabajo);

  return (
    <div className='h-full'>
      {/* <div className='ml-5 text-2xl mt-2'>
        Cargas de trabajo
      </div>
      <div className='flex space-x-2'>

        <div className='p-2 '>
          <CargaLecturaDataTable data={dataInfoCargaTrabajo} />
        </div>

        <div className='w-full mt-6'>
          <div className="flex space-x-1">
            <div className="flex-1 bg-[#008f6f] hover:bg-green-700  ">
              <IconButtonCargaTrabajo><IoMdPrint className='mr-1 w-[3.0vh] h-[3.0vh] text-white' /> <div className='text-white'>Imprimir</div></IconButtonCargaTrabajo>
            </div>
            <div className="flex-1 bg-green-800 hover:bg-green-700 ">
              {!editar
                ?
                <IconButtonCargaTrabajo onClick={handleEditar}><Pencil1Icon className='mr-1 w-[2.5vh] h-[2.5vh] text-white' /> <div className='text-white'>Editar</div></IconButtonCargaTrabajo>
                :
                <div className={`text-white' ${loading ? 'text-white pointer-events-none opacity-50' : 'text-white'}`}>
                  <IconButtonCargaTrabajo onClick={handleEnviarCargaDeTrabajo}>{!loading && <FaSave className='mr-1 w-[2.5vh] h-[2.5vh] text-white' />}
                    <div className='flex space-x-2'>
                      <div className={'text-white'}>
                        Guardar
                      </div>
                      <div>
                        {loading && <LoaderChico />}
                      </div>
                    </div>
                  </IconButtonCargaTrabajo>
                </div>
              }
            </div>
          </div>
          <TipoDeCarga booleanMostrar={editar} />
        </div>

      </div> */}

      <DoubleContainer>
        <Seccion1>
          <div className='p-2 '>
            <CargaLecturaDataTable data={dataInfoCargaTrabajo} />
          </div>
        </Seccion1>
        <Seccion2>
          <div className='w-full mt-6'>
            <div className="flex space-x-1">
              <div className="flex-1 bg-[#008f6f] hover:bg-green-700  ">
                <IconButtonCargaTrabajo><IoMdPrint className='mr-1 w-[3.0vh] h-[3.0vh] text-white' /> <div className='text-white'>Imprimir</div></IconButtonCargaTrabajo>
              </div>
              <div className="flex-1 bg-green-800 hover:bg-green-700 ">
                {!editar
                  ?
                  <IconButtonCargaTrabajo onClick={handleEditar}><Pencil1Icon className='mr-1 w-[2.5vh] h-[2.5vh] text-white' /> <div className='text-white'>Editar</div></IconButtonCargaTrabajo>
                  :
                  <div className={`text-white' ${loading ? 'text-white pointer-events-none opacity-50' : 'text-white'}`}>
                    <IconButtonCargaTrabajo onClick={handleEnviarCargaDeTrabajo}>{!loading && <FaSave className='mr-1 w-[2.5vh] h-[2.5vh] text-white' />}
                      <div className='flex space-x-2'>
                        <div className={'text-white'}>
                          Guardar
                        </div>
                        <div>
                          {loading && <LoaderChico />}
                        </div>
                      </div>
                    </IconButtonCargaTrabajo>
                  </div>
                }
              </div>
            </div>
            <TipoDeCarga booleanMostrar={editar} />
          </div>
        </Seccion2>
      </DoubleContainer>
    </div>
  )
}
