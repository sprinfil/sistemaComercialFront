import React,{useState} from 'react'
import { OperadoresCargaDeTrabajoComboBox } from '../../components/ui/OperadoresCargaDeTrabajoComboBox'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export const TipoDeCarga = () => {
    const [operadorSeleccionado, setOperadorSeleccionado] = useState();
  return (
    <div className='bg-muted h-full overflow-auto'>

    <div className='p-6'>
    <div className='text-xl mb-5'>Tipo de carga</div>
    <div className='text-xl '>
        <Select >
      <SelectTrigger className="w-full h-[7vh]">
        <SelectValue placeholder="Selecciona un tipo de carga" className="text-xl"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de carga</SelectLabel>
          <SelectItem value="Facturacion en sitio" className="text-base">Facturacion en sitio</SelectItem>
          <SelectItem value="Tradicional"  className="text-base">Tradicional</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>


        </div>

            <div className='mt-10'>
            <div className='text-xl mb-5'>Operadores</div>
                <OperadoresCargaDeTrabajoComboBox setCargoSeleccionado={setOperadorSeleccionado}/>
            </div>
    </div>
       
    </div>
  )
}
