import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { z } from "zod";
import { Button } from '../../components/ui/button.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form.tsx";
import { Input } from '../../components/ui/input.tsx';
import { anomaliaSchema } from './validaciones.ts';
import { useNavigate } from "react-router-dom";



export const BuscarUsuario = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof anomaliaSchema>>({
        resolver: zodResolver(anomaliaSchema),
        defaultValues: {
            nombre: "",
            descripcion: ""
        },
    })

    function onSubmit(values: z.infer<typeof anomaliaSchema>) {
        console.log(values);
        setLoading(true);

    }

return (
<div className='mt-5 w-[73vh] rounded-md border border-border p-4 h-[43vh]'>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div style={{ color: 'grey' }}>Consultar al usuario</div>
            <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre del usuario o la toma</FormLabel>
                        <FormControl>
                            <Input placeholder="Escribe el nombre del usuario o numero de toma" {...field} />
                        </FormControl>
                        <FormDescription>
                        {/* AQUI PUEDE IR DESCRIPCIÓN DEBAJO DEL INPUT EN EL FORM */}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex justify-end items-end mt-9 gap-2">
            <Button type="submit" >Aceptar</Button>
            <Button type="button">Crear usuario</Button>
            </div>
        </form>
    </Form>
    </div>
)
}
