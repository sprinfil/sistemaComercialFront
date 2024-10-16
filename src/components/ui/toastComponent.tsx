import React from 'react'
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

export const ToastComponent = ({ titulo, descripcion, variante }) => {

  const { toast } = useToast()

  return (
    toast({
      title: { titulo },
      description: { descripcion },
      variant: { variante },
    })
  )
}
