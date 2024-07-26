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

const SheetLibro = ({ trigger, updateData, libro, id_ruta}) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false);

    const LibroSchema = z.object({
        nombre: z.string().min(2, "Por lo menos 2 caracteres").max(20, "Máximo 20 caracteres"),
        id_ruta: z.number(),
    })


    const form = useForm<z.infer<typeof LibroSchema>>({
        resolver: zodResolver(LibroSchema),
        defaultValues: {
            id_ruta: id_ruta,
            nombre: libro != null ? libro.nombre : "",
        },
    })

    function onSubmit(values: z.infer<typeof LibroSchema>) {

        if (libro == null) {
            axiosClient.post(`/libro/create`, values)
                .then((response) => {
                    console.log(response);
                    toast({
                        title: "Exito",
                        description: "libro Creado",
                        variant: "success",
                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                    })
                    updateData();
                    setOpen(false);
                    form.reset({
                        nombre: "",
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
            axiosClient.put(`/libro/update/${libro.id}`, values)
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
                        <SheetTitle>{libro == null ? "Crear Libro" : "Editar " + libro.nombre}</SheetTitle>
                        <SheetDescription>
                            Llena toda la información correspondiente
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

export default SheetLibro