import React, { useState, useRef, useEffect } from 'react';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearContratoSchema } from '../validacionesContratacion'; 
import { z } from "zod";
import { Input } from '../../../../components/ui/input.tsx';
import Loader from "../../../../components/ui/Loader.tsx";
import { Button } from '../../../../components/ui/button.tsx';
import { Switch } from '../../../../components/ui/switch.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import ModalDireccionToma from '../../../../components/ui/ModalDireccionToma.tsx';
import DireccionNotificaciones from '../DireccionNotificaciones.tsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { CallesComboBox } from '../../../../components/ui/CallesComboBox.tsx';
import { ColoniaComboBox } from '../../../../components/ui/ColoniaComboBox.tsx';
import { LocalidadComboBox } from '../../../../components/ui/LocalidadComboBox.tsx';
import MarcoForm from '../../../../components/ui/MarcoForm.tsx';
import MarcoFormServiciosAContratar from '../../../../components/ui/MarcoFormServiciosAContratar.tsx';
export const CrearContratoForm = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [calleSeleccionada, setCalleSeleccionada] = useState<string | null>(null);
    const [coloniaSeleccionada, setColoniaSeleccionada] = useState<string | null>(null);
    const [entreCalle1Seleccionada, setEntreCalle1Seleccionada] = useState<string | null>(null);
    const [entreCalle2Seleccionada, setEntreCalle2Seleccionada] = useState<string | null>(null);

    const form = useForm<z.infer<typeof crearContratoSchema>>({
        resolver: zodResolver(crearContratoSchema),
        defaultValues: {
            id_usuario: 1,
            id_giro_comercial: 1,
            id_libro: 1,
            id_codigo_toma: 1,
            clave_catastral: "",
            calle:"",
            entre_calle_1: "",
            entre_calle_2:"",
            colonia: "",
            codigo_postal:"",
            localidad: "",
            diametro_toma:"" ,
            calle_notificaciones:"" ,
            entre_calle_notificaciones_2:"" ,
            tipo_servicio: "",
            tipo_toma: "",
            tipo_contratacion:"" ,
            c_agua: false,
            c_alc: false,
            c_san: false,

        },
    });

    const handleAbrirModalNotificaciones = () => 
    {
        setOpenModal(true);
    };


        const navegarDireccionToma = () => 
        {
            navigate("/direccion/toma");
        };

        const handleNavigationMapaToma = () => {
            navigate("/mapa/toma");
        };

    const onSubmit = (values: z.infer<typeof crearContratoSchema>) => {
        // Handle form submission
    };

    return (
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end '>
                    <div className="mb-[10px] h-full w-full mx-4">
                        <p className="text-[30px] font-medium ml-3">Crear contrato</p>
                        <div className="text-[20px] font-medium mt-10 ml-5">Usuario:</div>
                    </div>
                </div>
            </div>
            <div className="py-[20px] px-[10px]">
        {errors.general && <Error errors={errors.general} />}
    
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center mt-[10vh]">
            <div className="rounded-md border border-border shadow-lg p-8 w-[210vh] ">
            <div className="text-[20px] font-medium mb-5">No contrato. </div>
                    <div className="w-[full]">
                        <FormField
                            control={form.control}
                            name="clave_catastral"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Clave catastral</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe su clave catastral" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <div className='flex space-x-2'>
                            <div className='w-[120vh]'>
                            <FormField
                                control={form.control}
                                name="tipo_toma"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de toma</FormLabel>
                                        <FormControl>
                                        <Select
                                        onValueChange={(value) => field.onChange(value === 'si')}
                                        defaultValue={undefined}
                                        >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona tipo de toma" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="domestica">Domestica</SelectItem>
                                        <SelectItem value="comercial">Comercial</SelectItem>
                                        <SelectItem value="industrial">Industrial</SelectItem>
                                        
                                        </SelectContent>
                                    </Select>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                                <div className='w-[120vh]'>
                                <FormField
                                control={form.control}
                                name="tipo_toma"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diametro de la toma</FormLabel>
                                        <FormControl>
                                        <Select
                                        onValueChange={(value) => field.onChange(value === 'si')}
                                        defaultValue={undefined}
                                        >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el diametro de la toma" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="2-pulgadas">2"</SelectItem>
                                        <SelectItem value="4-pulgadas">4"</SelectItem>
                                        
                                        </SelectContent>
                                    </Select>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                </div>
                            
                        </div>
                        
                        <div className='flex space-x-2'>
                        <div className='w-[160vh]'>
                            <FormField
                                control={form.control}
                                name="calle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Calle</FormLabel>
                                        <FormControl>
                                        <CallesComboBox form={form} field={field} name="calle" setCargoSeleccionado={setCalleSeleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-[60vh]'>
                            <FormField
                                control={form.control}
                                name="numero_casa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numero de casa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe el numero de casa" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                            
                        </div>
                        <div className='flex space-x-4'>
                        <div className="w-[160vh]">
                            <FormField
                                control={form.control}
                                name="colonia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Colonia</FormLabel>
                                        <FormControl>
                                        <ColoniaComboBox form={form} field={field} name="colonia" setCargoSeleccionado={setColoniaSeleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-[60vh]">
                            <FormField
                                control={form.control}
                                name="codigo_postal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código postal</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe el código postal" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                        <div className='flex space-x-2'>
                        <div className='w-[110vh]'>
                        <FormField
                                control={form.control}
                                name="entre_calle_1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Entre calle 1</FormLabel>
                                        <FormControl>
                                        <CallesComboBox form={form} field={field} name="entre_calle_1" setCargoSeleccionado={setEntreCalle1Seleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-[110vh]'>
                           <FormField
                                control={form.control}
                                name="entre_calle_2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Entre calle 2</FormLabel>
                                        <FormControl>
                                        <CallesComboBox form={form} field={field} name="entre_calle_2" setCargoSeleccionado={setEntreCalle2Seleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           </div>
                        </div>
                        
                    
                    <div className='flex flex-col space-y-4'>
                        <FormField
                            control={form.control}
                            name="localidad"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Localidad</FormLabel>
                                    <FormControl>
                                    <LocalidadComboBox form={form} field={field} name="localidad" setCargoSeleccionado={setCalleSeleccionada}/>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex space-x-2'>

                    </div>

               
                <div className='flex space-x-8 mt-2'>
                <MarcoFormServiciosAContratar title={"Servicios a contratar"}>
                    <FormField
                        control={form.control}
                        name="c_agua"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="items-center">Agua</FormLabel>
                                <FormControl className="ml-4">         
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="c_alc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="items-center">Alcantarillado</FormLabel>
                                <FormControl className="ml-4">         
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="c_san"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="items-center">Saneamiento</FormLabel>
                                <FormControl className="ml-4">         
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </MarcoFormServiciosAContratar>
              
                <div className='w-[40vh] mt-4'>
                    <FormField
                        control={form.control}
                        name="tipo_contratacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de contratación</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={undefined}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el tipo de contratación" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="condicionado">Condicionado</SelectItem>
                                            <SelectItem value="desarrollador">Desarrollador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                

                </div>
                <Button type="submit" className='mt-[50px] w-[20vh] h-[5vh] ml-[3vh]' onClick={handleAbrirModalNotificaciones}>Guardar</Button>

                        
            </div>
                            
                                    
                
                    {loading && <Loader />}
                    <div className="w-full flex justify-normal mt-4">
                        
                        {
                           
                  <ModalDireccionToma
                  setIsOpen={setOpenModal}
                  isOpen={openModal}
                  method1={handleNavigationMapaToma}
                  method2={navegarDireccionToma}/>
                }
                    </div>
                </div>
            </form>
        </Form>
    </div>
        </div>
    );
};
