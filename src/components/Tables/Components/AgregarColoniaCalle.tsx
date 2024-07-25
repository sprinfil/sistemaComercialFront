"use client"

import { Button } from "../../ui/button";
import { ConceptosComboBox } from "../../ui/ConceptosComboBox";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { nuevaCalleSchema } from "../../Forms/ColoniaValidaciones.ts";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/ui/form.tsx";
import { useState } from "react";
import { ConceptosComboBoxNew } from "../../ui/ConceptosComboBoxNew.tsx";
import axiosClient from "../../../axios-client.ts";
import { ContextProvider, useStateContext } from "../../../contexts/ContextColonia.tsx";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "../../ui/use-toast.ts";
import ModalReactivacion from "../../ui/ModalReactivación.tsx";
import Loader from "../../ui/Loader.tsx";
import ColoniaCalleNewTable from "./ColoniaCalleNewTable.tsx";


export function AgregarColoniaCalle({ trigger, id_tipo_colonia, updateData }) {

    const { toast } = useToast()
    const [nombreConcepto, setNombreConcepto] = useState("");
    const {colonias, setColonias, setLoadingTable, colonia, calles, setAccion} = useStateContext();
    const [coloniaIdParaRestaurar, setColoniaIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();

    const form = useForm<z.infer<typeof nuevaCalleSchema>>({
        resolver: zodResolver(nuevaCalleSchema),
        defaultValues: {
            id_colonia: colonia.id,
            nombre: "",
        },
    })

    function errorYaExisteToast() {

        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "La colonia ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }

    function onSubmit(values: z.infer<typeof nuevaCalleSchema>) {
        console.log("Valores enviados:", values);
        axiosClient.post(`/calle/store`, values)
                .then((response) => {
                    const data = response.data;
                    if(data.restore){
                        setColoniaIdParaRestaurar(data.calle_id);
                        setModalReactivacionOpen(true);
                    }else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    console.log(response.data);
                    updateData();
                }
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const restaurarDato = (id: any) => {
        axiosClient.put(`/calle/restore/${id}`)
            .then(() => {
                setLoading(false);
                setModalReactivacionOpen(false);
                
            })
            .catch((err) => {
                setLoading(false);
            });
    };


    return (
        <div className="">
        <div className='h-[20px] w-full flex items-center justify-end'>
        {ModalReactivacionOpen &&
                        <ModalReactivacion
                            isOpen={ModalReactivacionOpen}
                            setIsOpen={setModalReactivacionOpen}
                            method={() => restaurarDato(coloniaIdParaRestaurar)}
                        />
                    }
                    
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">{trigger}</Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
                <SheetHeader>
                    <SheetTitle>Agregar nueva calle</SheetTitle>
                    <SheetDescription>
                        Aquí puedes agregar una nueva calle.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex items-center justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>Calle</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre de la calle" className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Guardar</Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                        
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
        
        </div>
        </div>
    )
}