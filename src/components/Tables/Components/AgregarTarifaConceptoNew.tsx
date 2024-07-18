"use client"

import { Button } from "../../ui/button";
import { ConceptosComboBox } from "../../ui/ConceptosComboBox";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { TarifaConceptoDetalleSchema } from "../../Forms/TarifaConceptoDetalleValidaciones.ts";
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


export function AgregarTarifaConceptoNew({ trigger, tarifa, id_tipo_toma, updateData }) {

    const [idConcepto, setIdoConcepto] = useState("");
    const { tarifas, setTarifas, setLoadingTable } = useStateContext();

    const form = useForm<z.infer<typeof TarifaConceptoDetalleSchema>>({
        resolver: zodResolver(TarifaConceptoDetalleSchema),
        defaultValues: {
            id_tarifa: tarifa.id,
            id_tipo_toma: id_tipo_toma,
            id_concepto: 1,
            monto: "100",
        },
    })

    function onSubmit(values: z.infer<typeof TarifaConceptoDetalleSchema>) {
        axiosClient.post(`/tarifaConceptoDetalle/create`, values)
            .then((response) => {
                console.log(response);
                updateData();
            })
            .catch((err) => {
                console.log(err);
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
                                name="id_concepto"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Concepto</FormLabel>
                                        <ConceptosComboBoxNew form={form} field={field} />
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="monto"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>Monto</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="col-span-3" {...field} />
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
