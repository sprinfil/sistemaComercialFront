import React,{useState} from 'react'
import { FiFilter } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox"
import MarcoForm from '../../components/ui/MarcoForm';
import MarcoFormFiltrosOT from '../../components/ui/MarcoFormFiltrosOT';
import { LibroFilterComboBox } from '../../components/ui/LibroFilterComboBox';
import { RutaFilterComboBox } from '../../components/ui/RutaFilterComboBox';


const FiltrosAsignarOTMasiva = () => {


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








  return (
    <div className='w-[70vh] overflow-auto'>

      <div className='border border-shadow ml-5 mt-5 h-full p-5'>

        <div className='flex space-x-2'>
          <div>
            <FiFilter className='w-[3vh] h-[3vh]' />
          </div>
          <div>
            Filtros

          </div>

        </div>
        <div className='flex flex-col mt-6 w-full'>
          <div className='text-muted-foreground text-[15px]'>Estado de la orden de trabajo</div>
          <hr className='mb-2 border border-gray-300 '></hr>

          <div className='flex space-x-6 mb-2'>
            <div className='flex items-center space-x-2'>
              <span>Asignada</span>
              <div className='ml-2'>
                <Checkbox />
              </div>
            </div>
            <div className='flex items-center space-x-6 ml-10'>
              <span>No asignada</span>
              <div className='ml-10'>
                <Checkbox />
              </div>
            </div>
          </div>


          <div className='text-muted-foreground text-[15px]'>Tipo de toma</div>
          <hr className='mb-2 border border-gray-300 '></hr>
          <div className=''>
  
            <div className='flex items-center space-x-2'>
              <span>Doméstica</span>
              <div className='ml-2'>
                <Checkbox />
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <span>Comercial</span>
              <div className='ml-3'>
                <Checkbox />
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <span>Industrial</span>
              <div className='ml-2'>
                <Checkbox />
              </div>
            </div>
          </div>

          <div className='text-muted-foreground text-[15px]'>Ruta y libro</div>
          <hr className='mb-2 border border-gray-300 '></hr>
          <div className=''>
  
            <div className='flex items-center space-x-2'>
              <span>Ruta</span>
              <div className='ml-2'>
              <RutaFilterComboBox
                        field={field}
                        name="id_concepto" // Puedes cambiar esto si es necesario
                        setCargoSeleccionado={handleSelect}
                    />

              </div>
            </div>
            <div className='flex items-center space-x-3 mt-2'>
              <span>Libro</span>
              <div className='ml-3'>
                <LibroFilterComboBox
                field={field2}
                name="id_libro" // Puedes cambiar esto si es necesario
                setCargoSeleccionado={handleSelect}/>

              </div>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default FiltrosAsignarOTMasiva