import React from 'react'
import { Switch } from "@/components/ui/switch"
import { AnomaliaPermissionsSchema } from '../../../../components/Forms/AnomaliaPermissionsValidaciones.ts'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '../../../../components/ui/button.tsx';
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form.tsx";
import { Input } from '../../../../components/ui/input.tsx';

export const LecturaFacturacionPermisos = () => {
  const form = useForm<z.infer<typeof AnomaliaPermissionsSchema>>({
    resolver: zodResolver(AnomaliaPermissionsSchema),
    defaultValues: {
      VerAnomalias: false,
      CrearAnomalias: false,
      EditarAnomalias: false,
      EliminarAnomalias: false,
    },
  });

  function onSubmit(values: z.infer<typeof AnomaliaPermissionsSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 border border-border p-4 rounded-md mb-[20px]">
            <p>Permisos del catalogo</p>
            <FormField
              control={form.control}
              name="VerAnomalias"
              render={({ field }) => (
                <FormItem>
                  <div className='w-full  relative  py-[10px] flex items-center rounded-md border border-border px-[10px]'>
                    <div>
                      <p>Ver Anomalias</p>
                      <p className='text-muted-foreground text-[13px]'>Permite ver las anomalais del catalogo</p>
                    </div>
                    <FormControl>
                      <div className='absolute right-3'>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="CrearAnomalias"
              render={({ field }) => (
                <FormItem>
                  <div className='w-full  relative  py-[10px] flex items-center rounded-md border border-border px-[10px]'>
                    <div>
                      <p>Crear Anomalias</p>
                      <p className='text-muted-foreground text-[13px]'>Permite Crear las anomalias en el catalogo</p>
                    </div>
                    <FormControl>
                      <div className='absolute right-3'>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="EditarAnomalias"
              render={({ field }) => (
                <FormItem>
                  <div className='w-full  relative  py-[10px] flex items-center rounded-md border border-border px-[10px]'>
                    <div>
                      <p>Editar Anomalias</p>
                      <p className='text-muted-foreground text-[13px]'>Permite Editar Anomalias en el catalogo</p>
                    </div>
                    <FormControl>
                      <div className='absolute right-3'>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="EliminarAnomalias"
              render={({ field }) => (
                <FormItem>
                  <div className='w-full  relative  py-[10px] flex items-center rounded-md border border-border px-[10px]'>
                    <div>
                      <p>Eliminar Anomalias</p>
                      <p className='text-muted-foreground text-[13px]'>Eliminar</p>
                    </div>
                    <FormControl>
                      <div className='absolute right-3'>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>

              )}
            />
          </div>

          {/* Other form fields go here */}
          {/*       <Button type="submit">Guardar</Button> */}

        </form>
      </Form>
    </div>
  );
}

export default LecturaFacturacionPermisos;
