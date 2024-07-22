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
import { RadiobuttonIcon, Pencil1Icon, SymbolIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
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
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

const modulos = [
  {
    titulo: "Catálogos",
    permission: "VerCatalogos",
    subModulos: [
      {
        titulo: "Catálogo de anomalias",
        Permisos: ["VerAnomalias", "CrearAnomalia", "EditarAnomalia", "EliminarAnomalia"],
      },
      {
        titulo: "Catálogo de conceptos",
        Permisos: ["VerConceptos", "CrearConcepto", "EditarConcepto", "EliminarConcepto"],
      },
      {
        titulo: "Catálogo de descuentos",
        Permisos: ["VerDescuentos", "CrearDescuento", "EditarDescuento", "EliminarDescuento"],
      },
      {
        titulo: "Catálogo de convenios",
        Permisos: ["VerConvenios", "CrearConvenio", "EditarConvenio", "EliminarConvenio"],
      },
      {
        titulo: "Catálogo de ajustes",
        Permisos: ["VerAjustes", "CrearAjuste", "EditarAjuste", "EliminarAjuste"],
      },
      {
        titulo: "Catálogo de constancias",
        Permisos: ["VerConstancias", "CrearConstancia", "EditarConstancia", "EliminarConstancia"],
      },
      {
        titulo: "Catálogo de bonificacions",
        Permisos: ["VerBonificaciones", "CrearBonificacion", "EditarBonificacion", "EliminarBonificacion"],
      },
      {
        titulo: "Catálogo de giros comerciales",
        Permisos: ["VerGirosComerciales", "CrearGiroComercial", "EditarGiroComercial", "EliminarGircoComercial"],
      },
      {
        titulo: "Catálogo de tipos de toma",
        Permisos: ["VerTiposDeToma", "CrearTipoDeToma", "EditarTipoDeToma", "EliminarTipoDeTomas"],
      },
    ]
  },
  {
    titulo: "Operadores del sistema",
    permission: "",
    subModulos: [
      {
        titulo: "Operadores del sistema",
        Permisos: ["VerOperadores", "CrearOperador", "EditarOperador", "EliminarOperador"],
      },
    ]
  },
]




export const ConfiguracionPermisos = () => {
  const { toast } = useToast()
  const [editar, setEditar] = useState(false);
  const { permissions, setPermissions, rol, editando, setEditando } = useStateContext();

  function successToastCreado() {
    toast({
      title: "¡Éxito!",
      description: "Cambios Guardados",
      variant: "success",

    })
  }

  function ErrorToast() {
    toast({
      title: "Error",
      description: "Ocurrio un error",
      variant: "destructive",
    })
  }

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

      //CATALOGO DESCUENTOS
      VerDescuentos: permissions.includes("VerDescuentos"),
      CrearDescuento: permissions.includes("CrearDescuento"),
      EditarDescuento: permissions.includes("EditarDescuento"),
      EliminarDescuento: permissions.includes("EliminarDescuento"),

      //CATALOGO CONVENIOS
      VerConvenios: permissions.includes("VerConvenios"),
      CrearConvenio: permissions.includes("CrearConvenio"),
      EditarConvenio: permissions.includes("EditarConvenio"),
      EliminarConvenio: permissions.includes("EliminarConvenio"),

      //CATALOGO AJUSTE
      VerAjustes: permissions.includes("VerAjustes"),
      CrearAjuste: permissions.includes("CrearAjuste"),
      EditarAjuste: permissions.includes("EditarAjuste"),
      EliminarAjuste: permissions.includes("EliminarAjuste"),

      //CATALOGO CONSTANCIA
      VerConstancias: permissions.includes("VerConstancias"),
      CrearConstancia: permissions.includes("CrearConstancia"),
      EditarConstancia: permissions.includes("EditarConstancia"),
      EliminarConstancia: permissions.includes("EliminarConstancia"),

      //CATALOGO BONIFICACION
      VerBonificaciones: permissions.includes("VerBonificaciones"),
      CrearBonificacion: permissions.includes("CrearBonificacion"),
      EditarBonificacion: permissions.includes("EditarBonificacion"),
      EliminarBonificacion: permissions.includes("EliminarBonificacion"),

      //CATALOGO GIROS COMERCIALES
      VerTiposDeToma: permissions.includes("VerTiposDeToma"),
      CrearTipoDeToma: permissions.includes("CrearTipoDeToma"),
      EditarTipoDeToma: permissions.includes("EditarTipoDeToma"),
      EliminarTipoDeTomas: permissions.includes("EliminarTipoDeTomas"),

      //CATALOGO OPERADORES
      VerOperadores: permissions.includes("VerOperadores"),
      CrearOperador: permissions.includes("CrearOperador"),
      EditarOperador: permissions.includes("EditarOperador"),
      EliminarOperador: permissions.includes("EliminarOperador"),

      //MODULO CONFIGURACIONES
      VerConfiguraciones: permissions.includes("VerConfiguraciones"),
    },
  });

  function onSubmit(values: z.infer<typeof AnomaliaPermissionsSchema>) {
    console.log(JSON.stringify(values));
    axiosClient.post(`/Rol/give_rol_permissions/${rol.id}`, JSON.stringify(values))
      .then((values) => {
        setPermissions(values.data);
        console.log(values);
        successToastCreado();
      })
      .catch((err) => {
        const response = err.response;
        ErrorToast();
      })
  }

  const all = (permisos) => {
    permisos.map((permiso) => { form.setValue(permiso, true); })
  }

  const none = (permisos) => {
    permisos.map((permiso) => { form.setValue(permiso, false); })
  }

  const restore = () => {

  }

  const _editar = () => {
    setEditar(!editar);
    setEditando(!editando);
  }

  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  useEffect(() => { console.log(editando) }, [editando])

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          {
            editando &&
            <div className='w-[50%] h-[4rem] fixed top-[11vh] left-[45%] z-50 '></div>
          }
          <div className='w-full h-[40px] bg-muted mb-[20px] rounded-md sticky top-0 z-10 flex items-center'>

            <div className='absolute left-3 flex gap-2'>
              <p>Configuración</p>
              <FormField
                control={form.control}
                name={"VerConfiguraciones"}
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

            </div>
            <div className='absolute right-3 flex gap-2'>

              {
                editar &&
                <div onClick={() => { _editar(); handleFormSubmit(); }}>
                  <IconButton>
                    <CheckCircledIcon className='text-green-500' />
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

            </div>
          </div>

          {modulos.map((modulo, index) => (
            <>
              <div className='relative'>
                <Accordion type="single" collapsible>
                  <AccordionItem value={modulo.titulo}>
                    <div className='absolute top-4 right-7'>
                      <FormField
                        control={form.control}
                        name={modulo.permission}
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
                    </div>
                    <AccordionTrigger>
                      {modulo.titulo}
                    </AccordionTrigger>

                    <AccordionContent>
                      <div key={index} className='border border-border rounded-md mb-[20px]'>

                        <div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Modulo</TableHead>
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
                                        {
                                          permiso != "" &&
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
                                        }

                                      </TableCell>
                                    ))}

                                    {
                                      editar &&
                                      <div className='flex'>
                                        <div className='w-full h-[60px] items-center justify-center flex p-1' onClick={() => { all(subModulo.Permisos) }}>
                                          <IconButton>
                                            <CheckCircledIcon />
                                          </IconButton>
                                        </div>
                                        <div className='w-full h-[60px] items-center justify-center flex p-1' onClick={() => { none(subModulo.Permisos) }}>
                                          <IconButton>
                                            <CrossCircledIcon />
                                          </IconButton>
                                        </div>
                                      </div>
                                    }

                                  </TableRow>
                                </TableBody>
                              </>
                            ))}
                          </Table>
                        </div>

                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </>
          ))}
        </Form>
      </form >
      {/* Other form fields go here */}
    </>
  );
}

export default ConfiguracionPermisos;
