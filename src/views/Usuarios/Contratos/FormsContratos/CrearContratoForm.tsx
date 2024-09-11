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
import { ZustandFiltrosContratacion } from '../../../../contexts/ZustandFiltrosContratacion.tsx';
import { noAuto } from '@fortawesome/fontawesome-svg-core';
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario.tsx';
import { GiroComercialComboBox } from '../../../../components/ui/GiroComercialComboBox.tsx';
import { TipoDeTomaComboBox } from '../../../../components/ui/TipoDeTomaComboBox.tsx';




export const CrearContratoForm = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [items, setItems] = useState([]);
    const [servicioAContratar, setServicioAContratar] = useState([]);

    const {latitudMapa, longitudMapa, libroToma, contrato, setContrato, setIdGiroComercial, 
        setIdLibro, setCalleSeleccionada, setColoniaSeleccionada, setEntreCalle1Seleccionada, setEntreCalle2Seleccionada,
        setServicioContratado, setGiroComercial,setTipoDeToma,
        setServicioContratado2} = ZustandFiltrosContratacion();


    const {usuariosEncontrados} = ZustandGeneralUsuario();
    console.log("Latitud:", latitudMapa); //Latitud seleccionada dentro del poligono
    console.log("Longitud:", longitudMapa); //Longitud seleccionada dentro del poligono
    console.log("Libro:", libroToma); //Longitud seleccionada dentro del poligono
    console.log(JSON.stringify(libroToma));

    

    const form = useForm<z.infer<typeof crearContratoSchema>>({
        resolver: zodResolver(crearContratoSchema),
        defaultValues: {
            id_giro_comercial: 0,
            clave_catastral: "",
            calle:0,
            num_casa:"",
            entre_calle_1: 0,
            entre_calle_2:0,
            colonia: 0,
            codigo_postal:"",
            localidad: "",
            diametro_toma:"" ,
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

        const detalleContratacion= () => 
            {
                navigate("/contrato/detalle");
            };

      


       
    const onSubmit = (values: z.infer<typeof crearContratoSchema>) => {

        //CONVERTIRMOS EL BOOL A STRING
        const agua = values.c_agua ? "agua" : null;
        const alcantarillado = values.c_alc ? "alcantarillado" : null;
        const saneamiento = values.c_san ? "saneamiento" : null;
        
        // Combinar alcantarillado y saneamiento en una sola variable
        const alcantarillado_y_saneamiento = (alcantarillado && saneamiento)
            ? `${alcantarillado} y ${saneamiento}` // Combina en un solo string si ambos están presentes
            : alcantarillado || saneamiento; // Usa solo alcantarillado o saneamiento si uno de ellos está presente
        
        // ARREGLO DE SERVICIOS
        const servicios = [agua, alcantarillado_y_saneamiento].filter(service => service !== null);
        

        const tipoToma = parseInt(values.tipo_toma, 10);
        setIdGiroComercial(values.id_giro_comercial);
        setServicioContratado(agua);
        setServicioContratado2(alcantarillado_y_saneamiento);

        //ESTOS DATOS SON PARA ENVIAR
        const datos = {
            id_usuario: usuariosEncontrados[0]?.id,
            nombre_contrato: values.nombre_contrato,
            clave_catastral: values.clave_catastral,
            tipo_toma:tipoToma,
            servicio_contratados: servicios,
            diametro_de_la_toma:values.diametro_toma,
            num_casa: values.num_casa,
            colonia: values.colonia,
            calle: values.calle,
            codigo_postal: values.codigo_postal,
            entre_calle_1: values.entre_calle_1,
            entre_calle_2: values.entre_calle_2,
            localidad: values.localidad,
            municipio: values.municipio,
            tipo_contratacion: values.tipo_contratacion,
        }

        setContrato(datos);

        
        console.log(servicioAContratar);
        handleAbrirModalNotificaciones();
        const crearContrato = {
                id_giro_comercial: values.id_giro_comercial,
                nombre_contrato: values.nombre_contrato,
                clave_catastral: values.clave_catastral,
                tipo_toma:values.tipo_toma,
                servicio_contratados: servicios,
                diametro_toma:values.diametro_toma,
                num_casa: values.num_casa,
                colonia: values.colonia,
                calle: values.calle,
                codigo_postal: values.codigo_postal,
                entre_calle_1: values.entre_calle_1,
                entre_calle_2: values.entre_calle_2,
                localidad: values.localidad,
                municipio: values.municipio,
                tipo_contratacion: values.tipo_contratacion,
        };


        const contratoString = JSON.stringify(crearContrato);
        console.log("estos valores llegaron y se almacenaron en el localstorage", contratoString);

        localStorage.setItem("contrato", contratoString); //AQUI SE GUARDA CONTRATO STRING QUE GUARDA EN EL LOCALSTORAGE EL OBJETO.

        //handleAbrirModalNotificaciones();

        //navegarCrearNuevaToma();

    };

    console.log(contrato);

    //con esto controlo que no pueda haber un alcantarillado y sanamiento, y viceversa
    const onSwitchChange = (fieldName: string, value: boolean) => {
        if (value) {
          form.setValue("c_alc", true);
          form.setValue("c_san", true);
        } else {
            form.setValue("c_alc", false);
            form.setValue("c_san", false);
        }
      };
   
    return (
        <div className="">
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
                            name="nombre_contrato"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre del contrato</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe a nombre de quien estará el contrato" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        </div>
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
                                        <TipoDeTomaComboBox form={form} field={field} name="tipo_toma" setCargoSeleccionado={setTipoDeToma}/>
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
                                name="diametro_toma"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diametro de la toma</FormLabel>
                                        <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                name="num_casa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numero de casa</FormLabel>
                                        <FormControl>
                                            <Input 
                                            type='number'
                                            placeholder="Escribe el numero de casa" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                            
                        </div>
                        <div className='flex space-x-4'>
                        <div className="w-full">
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
                       
                    </div>
                    <div className='flex space-x-2'>
                   
                    <div className="w-full">
                            <FormField
                                control={form.control}
                                name="codigo_postal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código postal</FormLabel>
                                        <FormControl>
                                            <Input
                                            type='number' 
                                            placeholder="Escribe el código postal" {...field} />
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
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={undefined}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona la localidad" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="La Paz">La paz</SelectItem>
                                            <SelectItem value="Todos santos">Todos santos</SelectItem>
                                            <SelectItem value="Punta prieta">Punta prieta</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <FormField
                            control={form.control}
                            name="municipio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Municipio</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={undefined}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el municipio" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="La Paz">La paz</SelectItem>
                                            <SelectItem value="Todos santos">Todos santos</SelectItem>
                                            <SelectItem value="Punta prieta">Punta prieta</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex space-x-2'>

                    </div>

               
                <div className='flex space-x-4 mt-2'>
                <div className='w-[156vh]'>
                <MarcoFormServiciosAContratar title={"Servicios a contratar"}>
                <div className='mr-10'>
                <FormField
                    control={form.control}
                    name="c_agua"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Agua</FormLabel>
                        <FormControl>         
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
                    </div>
                   
                    <div className='mr-5'>
                    <FormField
                    control={form.control}
                    name="c_alc"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Alcantarillado</FormLabel>
                        <FormControl>         
                            <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => onSwitchChange("c_alc", checked)} 
                            />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    </div>
                   
                    <div className='mr-5'>
                    <FormField
                    control={form.control}
                    name="c_san"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Saneamiento</FormLabel>
                        <FormControl>         
                            <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => onSwitchChange("c_san", checked)} 
                            />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    </div>
                    
                </MarcoFormServiciosAContratar>
                </div>
                            
              
                <div className='w-full mt-4'>
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
                <div className='mt-4 w-full'>
                <FormField
                control={form.control}
                name="id_giro_comercial"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Giro comercial</FormLabel>
                    <FormControl>
                    <GiroComercialComboBox form={form} field={field} name="id_giro_comercial" setCargoSeleccionado={setIdGiroComercial}/>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
            

                        
            </div>
                            
                        <div className='flex justify-end'>
                        <Button type="submit" className=''>Guardar</Button>
                            </div>
       
                
                    {loading && <Loader />}
                    <div className="w-full flex justify-normal mt-4">
                        
                        {
                           
                  <ModalDireccionToma
                  setIsOpen={setOpenModal}
                  isOpen={openModal}
                  method1={detalleContratacion}
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
