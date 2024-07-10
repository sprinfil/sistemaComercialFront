import React, { useState, useEffect } from 'react'
import { Switch } from "@/components/ui/switch"
import { AnomaliaPermissionsSchema } from '../../../../components/Forms/AnomaliaPermissionsValidaciones.ts'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '../../../../components/ui/button.tsx';
import { z } from "zod";
import IconButton from '../../../../components/ui/IconButton.tsx';
import axiosClient from '../../../../axios-client.ts';
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
import { RadiobuttonIcon, Pencil1Icon, SymbolIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { permission } from 'process';
import { useStateContextPermisos } from '../../../../contexts/ContextDetallePermisos.tsx';
import { useStateContext } from '../../../../contexts/ContextRol.tsx';
import { json } from 'node:stream/consumers';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const modulos = [
  {
    titulo: "CATALOGOS",
    subModulos: [
      {
        titulo: "Catalogo de anomalias",
        Permisos: ["VerAnomalias", "CrearAnomalia", "EditarAnomalia", "EliminarAnomalia"],
      },
      {
        titulo: "Catalogo de Giros Comerciales",
        Permisos: ["VerGirosComerciales", "CrearGiroComercial", "EditarGiroComercial", "EliminarGircoComercial"],
      },
      {
        titulo: "Catalogo de Conceptos",
        Permisos: ["VerConceptos", "CrearConcepto", "EditarConcepto", "EliminarConcepto"],
      },
    ]
  },
]



export const ConfiguracionPermisos = () => {

  const [editar, setEditar] = useState(false);
  const { permissions, setPermissions, rol } = useStateContext();

  console.log(permissions.includes("EditarAnomalia"));

  const form = useForm<z.infer<typeof AnomaliaPermissionsSchema>>({
    resolver: zodResolver(AnomaliaPermissionsSchema),
    defaultValues: {
      //CATALOGO ANOMALIAS
      VerAnomalias: permissions.includes("VerAnomalias"),
      CrearAnomalia: permissions.includes("CrearAnomalia"),
      EditarAnomalia: permissions.includes("EditarAnomalia"),
      EliminarAnomalia: permissions.includes("EliminarAnomalia"),

      //CATALOGO GIROS COMERCIALES
      VerGirosComerciales: permissions.includes("VerGirosComerciales"),
      CrearGiroComercial: permissions.includes("CrearGiroComercial"),
      EditarGiroComercial: permissions.includes("EditarGiroComercial"),
      EliminarGircoComercial: permissions.includes("EliminarGircoComercial"),
      
      //CATALOGO CONCEPTOS
      VerConceptos: permissions.includes("VerConceptos"),
      CrearConcepto: permissions.includes("CrearConcepto"),
      EditarConcepto: permissions.includes("EditarConcepto"),
      EliminarConcepto: permissions.includes("EliminarConcepto"),
    },
  });

  function onSubmit(values: z.infer<typeof AnomaliaPermissionsSchema>) {
    console.log(JSON.stringify(values));
    axiosClient.post(`/Rol/give_rol_permissions/${rol.id}`, JSON.stringify(values))
      .then((values) => {
        //setPermissions(values);
        //successToastCreado();
        console.log(values);
        //setNotification("usuario creado");
      })
      .catch((err) => {
        const response = err.response;
        //errorToast();
      })
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
          <>
            <Accordion type="single" collapsible>
            <AccordionItem value={modulo.titulo}>
            <AccordionTrigger>{modulo.titulo}</AccordionTrigger>
            <AccordionContent>
              <div key={index} className='border border-border rounded-md mb-[20px]'>
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
              </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        ))}

      </form >
      {/* Other form fields go here */}
    </>
  );
}

export default ConfiguracionPermisos;
