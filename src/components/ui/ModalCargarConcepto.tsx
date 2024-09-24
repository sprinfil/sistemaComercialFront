import React, { useEffect, useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import ComboBoxCargosCargables from './ComboBoxCargosCargables';
import axiosClient from '../../axios-client';
import dayjs from 'dayjs';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { title } from 'process';
import { useToast } from './use-toast';


const ModalCargarConcepto = ({ trigger, dueño, setCargos = null, handleCargoSelect, modelo_dueno = "toma", actualizar_cargos_usuario = null }) => {
  const { toast } = useToast();
  const [selected_concepto, set_selected_concepto] = useState({});
  const [letrasConvenio, setLetrasConvenio] = useState([]);
  const [selectedLetras, setSelectedLetras] = useState([])
  const [montoLetras, setMontoLetras] = useState(0);

  const monto_input = useRef();

  useEffect(() => {
    getLetrasConvenio();
  }, [])

  useEffect(() => {
    let monto = 0;
    if (selectedLetras?.length == 0)
      monto = 0;
    selectedLetras.map(letra => {
      monto += parseFloat(letra?.monto);
    })
    setMontoLetras(monto);
  }, [selectedLetras])

  const seleccionarLetra = (id, letra) => {

    let letraContainer = document.getElementById("letraContainer" + id);

    let valido = false;
    let selectedContainers = document.getElementsByClassName("selected");
    let todos = document.getElementsByClassName("letraContainer");
    let selectedArray = Array.from(selectedContainers);
    let validar = Array.from(todos).filter(container => !selectedArray.includes(container));

    let elementoConIdMasChico = validar.reduce((prev, current) => {
      return parseInt(current.id) < parseInt(prev.id) ? current : prev;
    }, validar[0]);

    if (elementoConIdMasChico?.id == "letraContainer" + id) {
      valido = true;
    }

    if (letraContainer?.classList.contains("selected") && selectedArray[selectedArray.length - 1]?.id == ("letraContainer" + id)) {
      valido = true;
    }
    if (selectedArray[selectedArray.length - 1] && selectedArray[selectedArray.length - 1]?.id == ("letraContainer" + id)) {
      valido = true;
    }

    if (valido) {
      let state = letraContainer?.getAttribute("data-state");
      if (state == "no") {
        letraContainer?.setAttribute("data-state", "si");
        letraContainer?.classList.add("selected");
        setSelectedLetras(prev => {
          return [letra, ...prev];
        })
      } else {
        letraContainer?.setAttribute("data-state", "no");
        letraContainer?.classList.remove("selected");
        setSelectedLetras(prev => {
          return prev.filter(item => item !== letra);
        });
      }
    }
  }

  const getLetrasConvenio = async () => {
    try {
      let response = await axiosClient.get("/Convenio/ConsultarLetras",
        {
          params: {
            modelo_origen: modelo_dueno,
            id_modelo: dueño?.id
          }
        })
      console.log(response)
      setLetrasConvenio(response.data.letra);
    } catch (e) {
      console.log(e)
    }
  }

  const cargar_cargo_directo = () => {
    const monto = parseFloat(monto_input.current.value);
    let data = {
      cargos: [
        {
          id_concepto: selected_concepto?.id,
          monto: monto
        },
      ],
      id_dueno: dueño.id,
      modelo_dueno: modelo_dueno,
      id_origen: 1,
      modelo_origen: "caja"
    }

    axiosClient.post("/cargo/generarDirecto", data)
      .then((response) => {
        console.log(response.data.data)
        handleCargoSelect(response.data.data, dueño);

        if (actualizar_cargos_usuario) {
          actualizar_cargos_usuario();
        } else {
          actualizar_cargos();
        }

      }).catch((response) => {
        console.log(response)
      })
  }

  const actualizar_cargos = async () => {
    const cargosResponse = await axiosClient.get(`/cargos/porModelo/pendientes`, {
      params: {
        id_dueno: dueño.id,
        modelo_dueno: modelo_dueno
      }
    });
    if (cargosResponse.data) {
      let filteredCargos = cargosResponse.data.filter(cargo => cargo.estado === 'pendiente');
      filteredCargos = filteredCargos.sort((a, b) => a.concepto.prioridad_abono - b.concepto.prioridad_abono)
      setCargos(filteredCargos);
    }
  }

  const cargar_letras = async () => {

    try {
      let ids = selectedLetras.map(letra => letra?.id);

      let response = await axiosClient.post("/cajas/cargarLetras",
        {
          ids: ids
        })
      console.log(response.data);
      response.data.map(concepto => {
        handleCargoSelect(concepto, dueño);
      })

      if (actualizar_cargos_usuario) {
        actualizar_cargos_usuario();
      } else {
        actualizar_cargos();
      }

      setLetrasConvenio(prev => {
        return prev.filter(letra => !ids.includes(letra?.id))
      })

    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al cargar las letras"
      })
    }
  }

  useEffect(() => {
    let tarifas = selected_concepto?.tarifas;
    let monto = 0;
    if (modelo_dueno == "usuario") {
      console.log(tarifas)
      monto = parseFloat(tarifas?.filter(tarifa => tarifa.id_tipo_toma == 5)[0]?.monto);
    } else {
      monto = parseFloat(tarifas?.filter(tarifa => tarifa.id_tipo_toma == dueño.id_tipo_toma)[0]?.monto);
    }
    if (monto_input.current) {
      monto_input.current.value = monto;
      selected_concepto.pide_monto == 1 ? monto_input.current.disabled = false : monto_input.current.disabled = true;
    }
  }, [selected_concepto])

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className='min-w-[50rem]'>
          <AlertDialogHeader>
            <AlertDialogTitle><p>Cargos</p></AlertDialogTitle>
            <AlertDialogDescription>Selecciona un concepto</AlertDialogDescription>
          </AlertDialogHeader>
          <>
            <Tabs defaultValue="Concepto" className="min-h-[40vh]" onValueChange={() => { setSelectedLetras([]) }} >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Concepto">Conceptos</TabsTrigger>
                <TabsTrigger value="Letras">Convenio</TabsTrigger>
              </TabsList>
              <TabsContent value="Concepto">
                <div >
                  <p className='mb-5'>Selecciona algún Concepto</p>
                  <ComboBoxCargosCargables set={set_selected_concepto} />
                  <p className='text-[14px] mt-5'>Monto (No Incluye IVA)</p>
                  <input ref={monto_input} type="number" className='bg-background border p-2 mt-2 w-full rounded-md outline-none' placeholder='Monto' />
                  {
                    selected_concepto?.pide_monto == 1 ?
                      <>
                        <p className='text-[14px] m-1 text-blue-500'>Monto Variable</p>
                      </>
                      :
                      <>
                        <p className='text-[14px] m-1 text-red-500'>Monto Fijo</p>
                      </>
                  }
                  <div className='flex gap-2  justify-end mt-5'>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={cargar_cargo_directo}>Aceptar</AlertDialogAction>
                  </div>

                </div>
              </TabsContent>
              <TabsContent value="Letras">
                <p>Selecciona letra(s)</p>
                <p>Total: $ {montoLetras.toFixed(2)}</p>
                <div className='max-h-[35vh] overflow-auto px-2'>
                  {
                    letrasConvenio?.length > 0 ?
                      <>
                        {letrasConvenio.map((letra, index) => (
                          <div
                            id={`letraContainer${letra?.id}`}
                            data-state="no"
                            className='select-none letraContainer data-[state=si]:bg-primary data-[state=si]:text-white flex gap-2 border my-2 rounded-md py-2 px-2 cursor-pointer transition-all hover:px-5'
                            onClick={() => { seleccionarLetra(letra?.id, letra) }}
                          >
                            <p>{letra?.numero_letra}</p>
                            <p>$ {letra?.monto}</p>
                            <p> Vigencia: {letra?.vigencia}</p>
                          </div>
                        ))}

                      </>
                      :
                      <><p>Sin Convenio</p></>
                  }
                </div>
                <div className='flex gap-2  justify-end mt-5'>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  {/* <Button onClick={() => { cargar_letras() }}>Aceptar</Button> */}
                  <AlertDialogAction onClick={() => { cargar_letras() }}>Aceptar</AlertDialogAction>
                </div>
              </TabsContent>
            </Tabs>

          </>
          <AlertDialogFooter>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ModalCargarConcepto