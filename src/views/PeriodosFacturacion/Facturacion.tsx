import React from 'react'
import { Button } from '../../components/ui/button'
import { Progress } from "@/components/ui/progress"

export const Facturacion = () => {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {

        const timer = setTimeout(() => setProgress(prev => {
            return prev + 4;
        }), 500)
        return () => clearTimeout(timer)

    }, [progress])

    return (
        <>
            <div className='border p-4 rounded-md'>
                <div className='flex items-center gap-4'>
                    <Button>Inciar Proceso</Button>
                    <Button variant={"outline"}>Imprimir Recibos</Button>
                </div>

                <Progress value={progress} className="w-[60%] mt-4" />
                <p className='mt-4 text-[20px]'>Facturadas: 244 / Pendiente: 144</p>
            </div>
        </>

    )
}
