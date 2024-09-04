import React, { useState } from 'react'
import { FiFilter } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox"
import MarcoForm from '../../components/ui/MarcoForm';
import MarcoFormFiltrosOT from '../../components/ui/MarcoFormFiltrosOT';
import { LibroFilterComboBox } from '../../components/ui/LibroFilterComboBox';
import { RutaFilterComboBox } from '../../components/ui/RutaFilterComboBox';
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt';
import { Input } from '../../components/ui/input';

const FiltrosAsignarOTMasiva = () => {



  //#regionVARIABLES PARA OBTENER EL VALOR DE LOS FILTROS
  const { isAsignadaChecked, setIsAsignadaChecked, 
        isNoAsignadaChecked, setIsNoAsignadaChecked, 
        rutaBooleanForLibro, 
        isConcluidaChecked, setIsConcluidaChecked,
        isCanceladaChecked, setIsCanceladaChecked,
        isDomesticaChecked, setIsDomesticaChecked,
        isComercialChecked, setIsComercialChecked,
        isIndustrialChecked, setIsIndustrialChecked,
        isEspecialChecked, setIsEspecialChecked, 
      } = ZustandFiltrosOrdenTrabajo();

  //#end






  // Estado para manejar el valor seleccionado
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');

  // Función para manejar la selección del concepto
  const handleSelect = (label: string) => {
    console.log('Concepto seleccionado:', label);
    // Aquí puedes hacer lo que necesites con la selección
  };

  // Simulación de un objeto 'field' como lo usarías en un formulario
  const field = {
    value: selectedValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    }
  };

  const field2 = {
    value: selectedValue2,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue2(event.target.value);
    }
  };




  console.log(rutaBooleanForLibro);



  return (
    <div className='overflow-auto min-h-[20vh]'>
      <div className='ml-5 mt-5 h-full p-3'>

        <div className='flex space-x-2'>
          <div>
            <FiFilter className='w-[3vh] h-[3vh]' />
          </div>
          <div>
            Filtros
          </div>

        </div>
        <div className='flex flex-col mt-6 w-full'>
          <div className="text-lg font-semibold mt-1">
            Estado de la orden de trabajo
          </div>
          <hr className="border-t border-border my-1" />

          <div className='grid grid-cols-2 gap-x-[10vh] mb-2'>
            <div className='flex items-center space-x-2'>
              <div className="text-sm font-medium mb-2 mt-2">
                Asignada
              </div>
              <div className='ml-2'>
                <Checkbox
                  checked={isAsignadaChecked}
                  onCheckedChange={setIsAsignadaChecked}
                />
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <div className="text-sm font-medium mb-2 mt-2">
                No asignada
              </div>
              <div className='ml-2'>
                <Checkbox
                  checked={isNoAsignadaChecked}
                  onCheckedChange={setIsNoAsignadaChecked}
                />
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <div className="text-sm font-medium mb-2 mt-2">
                Concluida
              </div>
              <div className='ml-2'>
                <Checkbox
                  checked={isConcluidaChecked}
                  onCheckedChange={setIsConcluidaChecked}
                />
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <div className="text-sm font-medium mb-2 mt-2">
                Cancelada
              </div>
              <div className='ml-2'>
                <Checkbox
                  checked={isCanceladaChecked}
                  onCheckedChange={setIsCanceladaChecked}
                />
              </div>
            </div>
          </div>


          <div className="text-lg font-semibold- mt-1">
            Tipo de toma
          </div>
          <hr className="border-t border-border my-1"></hr>
          <div className=''>

            <div className="grid grid-cols-2 gap-2 items-center justify-center">
              <div className="flex items-center">
                <div className="text-sm font-medium mb-2 mt-2">Doméstica</div>
                <div className="ml-2">
                  <Checkbox 
                   checked={isDomesticaChecked}
                   onCheckedChange={setIsDomesticaChecked}
                   />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium mb-2 mt-2">Comercial</div>
                <div className="ml-2">
                  <Checkbox 
                   checked={isComercialChecked}
                   onCheckedChange={setIsComercialChecked}
                   />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium mb-2 mt-2">Industrial</div>
                <div className="ml-2">
                  <Checkbox 
                   checked={isIndustrialChecked}
                   onCheckedChange={setIsIndustrialChecked}
                   />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium mb-2 mt-2">Especial</div>
                <div className="ml-2">
                  <Checkbox 
                   checked={isEspecialChecked}
                   onCheckedChange={setIsEspecialChecked}/>
                </div>
              </div>
            </div>
          </div>

          <div className="text-lg font-semibold- mt-2">
            Ruta y libro
          </div>
          <hr className="border-t border-border my-1"></hr>
          <div className='mt-2'>

            <div className='flex items-center space-x-2'>
              <div className="text-sm font-medium mb-2 mt-2">
                Ruta
              </div>
              <div className='ml-2'>
                <RutaFilterComboBox
                  field={field}
                  name="id_concepto" // Puedes cambiar esto si es necesario
                  setCargoSeleccionado={handleSelect}
                />

              </div>
            </div>
            <div className='flex items-center space-x-3 mt-2'>
              <div className="text-sm font-medium mb-2">
                Libro
              </div>
              <div className='ml-3'>

                <LibroFilterComboBox
                  field={field2}
                  name="id_libro" // Puedes cambiar esto si es necesario
                  setCargoSeleccionado={handleSelect}
                  disabled={rutaBooleanForLibro} />

              </div>
            </div>

          </div>
        </div>
        <div className="text-lg font-semibold- mt-2">
            Saldo
          </div>
          <hr className="border-t border-border my-1"></hr>
          <div className=' flex space-x-5 items-center mt-5'>
          <div className="text-sm font-medium mb-2">
          Minimo
            </div>
          <div>
          <Input className='w-[8vh]'/>

          </div>
          <div className="text-sm font-medium mb-2">
          Maximo
            </div>
          <div>
          <Input className='w-[8vh]'/>

          </div>
          </div>
      </div>

    </div>
  )
}

export default FiltrosAsignarOTMasiva