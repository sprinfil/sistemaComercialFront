import React from 'react'
import { DoubleContainer, Seccion1, Seccion2 } from '../../components/ui/DoubleContainer'
import { DataTableRecorridos } from '../../components/ui/DataTableRecorridos'

export const Recorridos = () => {
    return (
        <div className='h-full'>
            <DoubleContainer>
                <Seccion1>
                    <div className='w-full p-3'>
                        <DataTableRecorridos />
                    </div>
                </Seccion1>
                <Seccion2>

                </Seccion2>
            </DoubleContainer>
        </div>
    )
}
