import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { AnomaliaPermissionsSchema } from '../../../../components/Forms/AnomaliaPermissionsValidaciones.ts'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '../../../../components/ui/button.tsx';
import { z } from "zod";
import IconButton from '../../../../components/ui/IconButton.tsx';
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
import Permisos from '../Permisos.tsx';
import { RadiobuttonIcon, Pencil1Icon, SymbolIcon, CheckCircledIcon } from '@radix-ui/react-icons';

const modulos = [
  {
    titulo: "CATALOGOS",
    subModulos: [
      {
        titulo: "Catalogo de anomalias",
        Permisos: ["VerAnomalias", "CrearAnomalias", "EditarAnomalias", "EliminarAnomalias"],
      },
      {
        titulo: "Catalogo de Giros Comerciales",
        Permisos: ["VerGirosComerciales", "CrearGirosComerciales", "EditarGirosComerciales", "EliminarGirosComerciales"],
      }
    ]
  },
]



export const ConfiguracionPermisos = () => {
  const [editar, setEditar] = useState(false);
  const form = useForm<z.infer<typeof AnomaliaPermissionsSchema>>({
    resolver: zodResolver(AnomaliaPermissionsSchema),
    defaultValues: {
      VerAnomalias: false,
      CrearAnomalias: false,
      EditarAnomalias: false,
      EliminarAnomalias: false,
      VerGirosComerciales: false,
      CrearGirosComerciales: false,
      EditarGirosComerciales: false,
      EliminarGirosComerciales: false,
    },
  });

  function onSubmit(values: z.infer<typeof AnomaliaPermissionsSchema>) {
    console.log(values);
  }

  const all = (permisos) => {
    permisos.map((permiso) => { form.setValue(permiso, true); })
  }

  const _editar = () => {
    setEditar(!editar);
  }

  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <div className='w-full h-[40px] bg-muted mb-[20px] rounded-md sticky top-0 z-10 flex items-center'>
        <div className='absolute left-3 flex gap-2'>
          <p>Configuración</p>
        </div>
        <div className='absolute right-3 flex gap-2'>

          {
            editar &&
            <div onClick={() => { _editar(); handleFormSubmit(); }}>
              <IconButton>
                <CheckCircledIcon />
              </IconButton>
            </div>
          }

          {
            !editar &&
            <div onClick={_editar}>
              <IconButton>
                <Pencil1Icon />
              </IconButton>
            </div>
          }
          <IconButton>
            <SymbolIcon />
          </IconButton>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {modulos.map((modulo, index) => (
          <div key={index} className='border border-border rounded-md mb-[20px]'>
            <p key={index} className='text-sm m-[14px]'>{modulo.titulo}</p>
            <Form {...form}>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SubModulo</TableHead>
                      <TableHead>Ver</TableHead>
                      <TableHead>Crear</TableHead>
                      <TableHead>Editar</TableHead>
                      <TableHead>Eliminar</TableHead>
                      {
                        editar &&
                        <TableHead></TableHead>
                      }
                    </TableRow>
                  </TableHeader>
                  {modulo.subModulos.map((subModulo, index) => (
                    <>
                      <TableBody>
                        <TableRow>
                          <TableCell>{subModulo.titulo}</TableCell>
                          {subModulo.Permisos.map((permiso, index) => (
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={permiso}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={!editar}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          ))}

                          {
                            editar &&
                            <div className='w-full h-[60px] items-center justify-center flex p-4' onClick={() => { all(subModulo.Permisos) }}>
                              <IconButton>
                                <RadiobuttonIcon />
                              </IconButton>
                            </div>
                          }

                        </TableRow>
                      </TableBody>
                    </>
                  ))}
                </Table>
              </div>
            </Form>
          </div>
        ))}

      </form >
      {/* Other form fields go here */}
    </>
  );
}

export default ConfiguracionPermisos;
