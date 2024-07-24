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


export function AgregarColoniaCalle({ trigger, id_tipo_colonia, updateData }) {

    const [nombreConcepto, setNombreConcepto] = useState("");
    const [idConcepto, setIdoConcepto] = useState("");
    const {colonias, setColonias, setLoadingTable, colonia, calles, setAccion} = useStateContext();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();

    const form = useForm<z.infer<typeof nuevaCalleSchema>>({
        resolver: zodResolver(nuevaCalleSchema),
        defaultValues: {
            id_colonia: colonia.id,
            nombre: "",
        },
    })

    function onSubmit(values: z.infer<typeof nuevaCalleSchema>) {
        console.log("Valores enviados:", values);
        axiosClient.post(`/calle/store`, values)
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
    )
}