"use client"

import { Button } from "../../ui/button";
import { ConceptosComboBox } from "../../ui/ConceptosComboBox";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { nuevoServicioSchema } from "../../Forms/TarifaValidaciones.ts";
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
import { ContextProvider, useStateContext } from "../../../contexts/ContextTarifa.tsx";


export function AgregarTarifaServicio({ trigger, id_tipo_toma, updateData }) {

    const [nombreConcepto, setNombreConcepto] = useState("");
    const [idConcepto, setIdoConcepto] = useState("");
    const {tarifas, setTarifas, setLoadingTable, tarifa, servicios, setAccion} = useStateContext();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();

    const form = useForm<z.infer<typeof nuevoServicioSchema>>({
        resolver: zodResolver(nuevoServicioSchema),
        defaultValues: {
            id: 23,
            id_tarifa: 1,
            id_tipo_toma: 1,
            rango: 0,
            agua:  0,
            alcantarillado: 0,
            saneamiento:  0,
            
        },
    })



    function onSubmit(values: z.infer<typeof nuevoServicioSchema>) {
        console.log("Valores enviados:", values);
        axiosClient.post(`/tarifaServicioDetalle/create`, values)
            .then((response) => {
                console.log(response.data);
                updateData();
            })
            .catch((err) => {
                console.log(err.response);
            })
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">{trigger}</Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
                <SheetHeader>
                    <SheetTitle>Agregar Concepto</SheetTitle>
                    <SheetDescription>
                        Agrega una nueva tarifa para un concepto
                    </SheetDescription>
                </SheetHeader>
                <div className="flex items-center justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="rango"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>rango</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="agua"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>agua</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alcantarillado"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>alcantarillado</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="saneamiento"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>saneamiento</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}
