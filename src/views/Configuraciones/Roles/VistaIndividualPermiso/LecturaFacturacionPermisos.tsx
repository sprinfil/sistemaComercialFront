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
import { DataTable } from '../../../../components/ui/DataTable.tsx';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modulo</TableHead>
                <TableHead>Ver</TableHead>
                <TableHead>Crear</TableHead>
                <TableHead>Editar</TableHead>
                <TableHead>Eliminar</TableHead>
                <TableHead>Todos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Catalogo De Anomalias</TableCell>
                <TableCell>  <FormField
                  control={form.control}
                  name="VerAnomalias"
                  render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Other form fields go here */}
          {/*     <Button type="submit">Guardar</Button> */}


        </form>
      </Form>
    </div>
  );
}

export default LecturaFacturacionPermisos;
