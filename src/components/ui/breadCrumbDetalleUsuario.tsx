import { Slash } from "lucide-react"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react"


interface mostrarProps {
    mostrarSiguiente: boolean
    setMostrarSiguiente: React.Dispatch<React.SetStateAction<boolean>>;

}
 
export function BreadCrumbDetalleUsuario({mostrarSiguiente, setMostrarSiguiente}: mostrarProps) {

  const handleClick = () => {
    // Lógica adicional si es necesario
    setMostrarSiguiente(false);
  };

  return (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem >
            <BreadcrumbLink href="/usuario"><div onClick={handleClick}>Usuario</div></BreadcrumbLink>
            </BreadcrumbItem>
            {
                mostrarSiguiente &&
                <BreadcrumbSeparator>
                <Slash />
                </BreadcrumbSeparator>
            }
            {
                mostrarSiguiente &&
                <BreadcrumbItem>
                <BreadcrumbLink href="/usuario/toma">Toma</BreadcrumbLink>
                </BreadcrumbItem>
                
            }
        </BreadcrumbList>
        </Breadcrumb>
   
  )
}