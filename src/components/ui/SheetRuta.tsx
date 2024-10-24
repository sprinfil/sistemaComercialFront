import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axiosClient from '../../axios-client'
import { ToastComponent } from './toastComponent'
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@radix-ui/react-toast'
import { useStateContext } from '../../contexts/ContextPoligonos'

const SheetRuta = ({ trigger, updateData, ruta}) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false);

    const RutaSchema = z.object({
        nombre: z.string().min(2, "Por lo menos 2 caracteres").max(20, "Máximo 20 caracteres"),
        color: z.string(),
    })


    const form = useForm<z.infer<typeof RutaSchema>>({
        resolver: zodResolver(RutaSchema),
        defaultValues: {
            nombre: ruta != null ? ruta.nombre : "",
            color: ruta != null ? ruta.color : ""
        },
    })

    function onSubmit(values: z.infer<typeof RutaSchema>) {
        if (ruta == null) {
            axiosClient.post(`/ruta/create`, values)
                .then((response) => {
                    console.log(response);
                    toast({
                        title: "Exito",
                        description: "Ruta Creada",
                        variant: "success",
                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                    })
                    updateData();
                    setOpen(false);
                    form.reset({
                        nombre: "",
                        color: ""
                    });
                })
                .catch((response) => {
                    toast({
                        title: "Error",
                        description: response.response.data.message,
                        variant: "destructive",
                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                    })
                })
        } else {
            axiosClient.put(`/ruta/update/${ruta.id}`, values)
                .then((response) => {
                    console.log(response);
                    toast({
                        title: "Exito",
                        description: "Ruta Actualizada",
                        variant: "success",
                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                    })
                    updateData();
                    setOpen(false);
                 
                })
                .catch((response) => {
                    toast({
                        title: "Error",
                        description: response.response.data.message,
                        variant: "destructive",
                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                    })
                })
        }

    }

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>{trigger}</SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <SheetTitle>{ruta == null ? "Crear Ruta" : "Editar " + ruta.nombre}</SheetTitle>
                        <SheetDescription>
                            Ingresa toda la información correspondiente
                        </SheetDescription>
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="nombre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="nombre" {...field} />
                                                </FormControl>
                                                <FormDescription>

                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="color"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <Input type="color" placeholder="nombre" {...field} />
                                                </FormControl>
                                                <FormDescription>

                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Guardar</Button>
                                </form>
                            </Form>
                        </>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SheetRuta