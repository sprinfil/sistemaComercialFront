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

    const { latitudMapa, longitudMapa, libroToma, contrato, setContrato, setIdGiroComercial,
        setIdLibro, setCalleSeleccionada, setColoniaSeleccionada, setEntreCalle1Seleccionada, setEntreCalle2Seleccionada,
        setServicioContratado, setGiroComercial, setTipoDeToma, tomaPreContratada, isCheckInspeccion, boolPeticionContratacion,
        setServicioContratado2, selectedLocation, getCoordenadaString, setNombreGiroComercial, esPreContratado,getCoordenadaString2, puntoTomaLatitudLongitudAPI} = ZustandFiltrosContratacion();


    const { usuariosEncontrados } = ZustandGeneralUsuario();
    console.log("Latitud:", latitudMapa); //Latitud seleccionada dentro del poligono
    console.log("Longitud:", longitudMapa); //Longitud seleccionada dentro del poligono
    console.log("Libro:", libroToma); //Longitud seleccionada dentro del poligono
    console.log(JSON.stringify(libroToma));
    console.log(selectedLocation);

    const form = useForm<z.infer<typeof crearContratoSchema>>({
        resolver: zodResolver(crearContratoSchema),
        defaultValues: {
            id_giro_comercial: 0,
            nombre_contrato: "",
            clave_catastral: "",
            calle: 0,
            num_casa: "1",
            entre_calle_1: 0,
            entre_calle_2: 0,
            colonia: 0,
            codigo_postal: "",
            localidad: "La Paz",
            tipo_toma: 0,
            tipo_contratacion: "",
            c_agua: false,
            c_alc: false,
            c_san: false,

        },
    });

    const handleAbrirModalNotificaciones = () => {
        setOpenModal(true);
    };


    const navegarDireccionToma = () => {
        navigate("/direccion/toma");
    };

    const detalleContratacion = () => {
        navigate("/contrato/detalle");
    };


    console.log(tomaPreContratada?.id)


    const onSubmit = (values: z.infer<typeof crearContratoSchema>) => {

        const coordenadasComoCadenas = puntoTomaLatitudLongitudAPI.map(coord => coord.toString());

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
        const num_casaDato = Number(values.num_casa);

        setIdGiroComercial(values.id_giro_comercial);
        setServicioContratado(agua);
        setServicioContratado2(alcantarillado_y_saneamiento);

        let tomaId = 0;
        if (tomaPreContratada && tomaPreContratada.id !== undefined) {
            tomaId = tomaPreContratada.id;
        }
        console.log(tomaId);

        const isAguaActive = tomaPreContratada.c_agua != null;
        const isAlcActive = tomaPreContratada.c_alc != null;
        const isSanActive = tomaPreContratada.c_san != null;
        console.log(isAguaActive)
        console.log(isAlcActive)
        console.log(isAlcActive)

        const serviciosSeleccionados = [
            ...(values.c_agua != null && !isAguaActive ? ["agua"] : []),
            ...(alcantarillado_y_saneamiento && !isAlcActive && !isSanActive ? [alcantarillado_y_saneamiento] : []),
        ];

        console.log(serviciosSeleccionados);
        let datos;
        if (!esPreContratado) {
            // Estos datos son para enviar
            datos = {
                id_usuario: usuariosEncontrados[0]?.id,
                nombre_contrato: values.nombre_contrato,
                clave_catastral: values.clave_catastral,
                tipo_toma: tipoToma,
                servicio_contratados: serviciosSeleccionados,
                //diametro_toma: values.diametro_de_la_toma,
                num_casa: values.num_casa,
                colonia: values.colonia,
                calle: values.calle,
                codigo_postal: values.codigo_postal,
                entre_calle1: values.entre_calle_1,
                entre_calle2: values.entre_calle_2,
                localidad: values.localidad,
                municipio: values.municipio,
                tipo_contratacion: values.tipo_contratacion,
                coordenada: coordenadasComoCadenas,

            };
        } else {
            // Estos datos son para enviar
            datos = {
                id_toma: tomaId,
                id_usuario: usuariosEncontrados[0]?.id,
                nombre_contrato: values.nombre_contrato,
                clave_catastral: values.clave_catastral,
                tipo_toma: tipoToma || 0,
                servicio_contratados: serviciosSeleccionados,
                //diametro_toma: values.diametro_de_la_toma, // Usar el campo correcto aquí
                num_casa: values.num_casa,
                colonia: values.colonia || 0,
                calle: values.calle || 0,
                codigo_postal: values.codigo_postal,
                entre_calle1: values.entre_calle_1 || 0,
                entre_calle2: values.entre_calle_2 || 0,
                localidad: values.localidad,
                municipio: values.municipio,
                tipo_contratacion: values.tipo_contratacion,
            };
        }

        const datosFiltrados = {
            ...datos,
            // Incluye c_agua, c_alc, c_san solo si no están activos en tomaPreContratada
            ...(values.c_agua != null && !isAguaActive ? { c_agua: values.c_agua } : {}),
            ...(values.c_alc != null && !isAlcActive ? { c_alc: values.c_alc } : {}),
            ...(values.c_san != null && !isSanActive ? { c_san: values.c_san } : {}),
        };

        setContrato(datosFiltrados);
        console.log(datosFiltrados);

        console.log(servicioAContratar);
        handleAbrirModalNotificaciones();
        const crearContrato = {
            estatus: isCheckInspeccion,
            id_giro_comercial: values.id_giro_comercial,
            nombre_contrato: values.nombre_contrato,
            clave_catastral: values.clave_catastral,
            tipo_toma: values.tipo_toma,
            servicio_contratados: servicios,
            //diametro_toma:values.diametro_de_la_toma,
            num_casa: values.num_casa,
            colonia: values.colonia,
            calle: values.calle,
            codigo_postal: values.codigo_postal,
            entre_calle1: values.entre_calle_1,
            entre_calle2: values.entre_calle_2,
            localidad: values.localidad,
            municipio: values.municipio,
            tipo_contratacion: values.tipo_contratacion,
            coordenada: selectedLocation
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


    const [campoAgua, setCampoAgua] = useState(false);
    const [contrato2, setContrato2] = useState(false);


    useEffect(() => {
        console.log(tomaPreContratada);
        if (tomaPreContratada) {

            form.reset({
                clave_catastral: tomaPreContratada?.clave_catastral || '',
                tipo_toma: tomaPreContratada?.id_tipo_toma || '',
                diametro_de_la_toma: tomaPreContratada?.diametro_de_la_toma || '',
                calle: tomaPreContratada?.calle || '',
                num_casa: String(tomaPreContratada?.numero_casa) || 0,
                colonia: tomaPreContratada?.colonia || '',
                codigo_postal: tomaPreContratada?.codigo_postal || '',
                entre_calle_1: Number(tomaPreContratada?.entre_calle_1) || '',
                entre_calle_2: Number(tomaPreContratada?.entre_calle_2) || '',
                localidad: tomaPreContratada?.localidad || '',
                municipio: tomaPreContratada?.municipio || '',
                c_agua: Boolean(tomaPreContratada?.c_agua) || false,
                c_alc: Boolean(tomaPreContratada?.c_alc) || false,
                c_san: Boolean(tomaPreContratada?.c_san) || false,
                tipo_contratacion: tomaPreContratada?.tipo_contratacion || '',
                id_giro_comercial: tomaPreContratada?.id_giro_comercial || 0,

            });


            console.log(tomaPreContratada);

            if (tomaPreContratada.c_agua != null) {
                setCampoAgua(true);

            }

            if (tomaPreContratada.c_alc != true && tomaPreContratada.c_san != null) {
                setContrato2(true);

            }



        }
    }, [tomaPreContratada])



    console.log(tomaPreContratada);
console.log(esPreContratado);

    return (
        <div className="">
            <div className="py-[20px] px-[10px]">
                {errors.general && <Error errors={errors.general} />}

                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center ">
                        <div className="rounded-md border border-border shadow-lg p-8 w-[200vh]">
                            <h1 className="text-3xl mb-[7vh]">
                                Crear contrato
                            </h1>
                            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-10">Nombre del contrato</h3>
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


                            <div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-10">Datos de la toma</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                </div>
                            </div>


                            <div className='flex space-x-2'>
                                <div className="w-[120vh]">
                                    <FormField
                                        control={form.control}
                                        name="clave_catastral"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Clave catastral</FormLabel>
                                                <FormControl>
                                                    {
                                                        esPreContratado ?
                                                            <Input placeholder="Escribe su clave catastral" {...field} readOnly />
                                                            :
                                                            <Input placeholder="Escribe su clave catastral" {...field} />


                                                    }
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='flex space-x-2'>
                                    <div className='w-[100vh]'>
                                        <FormField
                                            control={form.control}
                                            name="tipo_toma"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo de toma</FormLabel>
                                                    <FormControl>
                                                        <TipoDeTomaComboBox form={form} field={field} name="tipo_toma" setCargoSeleccionado={setTipoDeToma} />
                                                    </FormControl>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>


                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-10">Dirección de la toma</h3>

                            <div className='flex space-x-2'>
                                <div className='w-[160vh]'>
                                    <FormField
                                        control={form.control}
                                        name="calle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Calle</FormLabel>
                                                <FormControl>
                                                    {esPreContratado ?
                                                        <CallesComboBox form={form} field={field} name="calle" setCargoSeleccionado={setCalleSeleccionada} disabled={true} />

                                                        :
                                                        <CallesComboBox form={form} field={field} name="calle" setCargoSeleccionado={setCalleSeleccionada} disabled={false} />

                                                    }
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
                                                    {esPreContratado ?
                                                        <Input
                                                            type='number'
                                                            placeholder="Escribe el numero de casa" {...field}
                                                            readOnly />
                                                        :
                                                        <Input
                                                            type='number'
                                                            placeholder="Escribe el numero de casa" {...field} />}

                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                            </div>
                            <div className='flex space-x-4'>


                            </div>

                            <div className='flex space-x-2'>

                                <div className="w-[160vh]">
                                    <FormField
                                        control={form.control}
                                        name="colonia"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Colonia</FormLabel>
                                                <FormControl>
                                                    {
                                                        esPreContratado ? 
                                                        <ColoniaComboBox form={form} field={field} name="colonia" setCargoSeleccionado={setColoniaSeleccionada} disabled={true} />
                                                        :
                                                        <ColoniaComboBox form={form} field={field} name="colonia" setCargoSeleccionado={setColoniaSeleccionada} disabled={false} />

                                                    }
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
                                                    {esPreContratado ?
                                                        <Input
                                                            type='number'
                                                            placeholder="Escribe el código postal" {...field}
                                                            readOnly />
                                                        :
                                                        <Input
                                                            type='number'
                                                            placeholder="Escribe el código postal" {...field} />}

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
                                                    {
                                                        esPreContratado ? 
                                                        <CallesComboBox form={form} field={field} name="entre_calle_1" setCargoSeleccionado={setEntreCalle1Seleccionada} disabled={true} />
                                                        :
                                                        <CallesComboBox form={form} field={field} name="entre_calle_1" setCargoSeleccionado={setEntreCalle1Seleccionada} disabled={false} />
                                                    }
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
                                                    {
                                                        esPreContratado ? 
                                                        <CallesComboBox form={form} field={field} name="entre_calle_2" setCargoSeleccionado={setEntreCalle2Seleccionada}  disabled={true} />

                                                        :

                                                        <CallesComboBox form={form} field={field} name="entre_calle_2" setCargoSeleccionado={setEntreCalle2Seleccionada} disabled={false}/>

                                                    }
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
                                        name="localidad"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Localidad</FormLabel>
                                                {
                                                    esPreContratado ?
                                                        <Select
                                                            disabled={true} // Ajusta esto según si el campo debe estar deshabilitado o no
                                                            onValueChange={(value) => {
                                                                field.onChange(value); // Actualiza el valor en react-hook-form
                                                            }}
                                                            value={field.value || ''} // Valor controlado por react-hook-form
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecciona la localidad" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="La Paz">La Paz</SelectItem>
                                                                <SelectItem value="Todos santos">Todos Santos</SelectItem>
                                                                <SelectItem value="Chametla">Chametla</SelectItem>
                                                                <SelectItem value="El Centenario">El Centenario</SelectItem>
                                                                <SelectItem value="El Pescadero">El Pescadero</SelectItem>
                                                                <SelectItem value="Los Barriles">Los Barriles</SelectItem>
                                                                <SelectItem value="Agua Amarga">Agua Amarga</SelectItem>


                                                            </SelectContent>
                                                        </Select>
                                                        :
                                                        <Select
                                                            disabled={false} // Ajusta esto según si el campo debe estar deshabilitado o no
                                                            onValueChange={(value) => {
                                                                field.onChange(value); // Actualiza el valor en react-hook-form
                                                            }}
                                                            value={field.value || ''} // Valor controlado por react-hook-form
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecciona la localidad" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="La Paz">La Paz</SelectItem>
                                                                <SelectItem value="Todos santos">Todos Santos</SelectItem>
                                                                <SelectItem value="Chametla">Chametla</SelectItem>
                                                                <SelectItem value="El Centenario">El Centenario</SelectItem>
                                                                <SelectItem value="El Pescadero">El Pescadero</SelectItem>
                                                                <SelectItem value="Los Barriles">Los Barriles</SelectItem>
                                                                <SelectItem value="Agua Amarga">Agua Amarga</SelectItem>


                                                            </SelectContent>
                                                        </Select>
                                                }

                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='w-[110vh]'>
                                    <FormField
                                        control={form.control}
                                        name="municipio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Municipio</FormLabel>
                                                <Select
                                                    disabled={false} // Ajusta esto según si el campo debe estar deshabilitado o no
                                                    onValueChange={(value) => {
                                                        field.onChange(value); // Actualiza el valor en react-hook-form
                                                    }}
                                                    value={field.value || ''} // Valor controlado por react-hook-form
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona el municipio" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="La Paz">La Paz</SelectItem>
                                                        <SelectItem value="Los cabos">Los Cabos</SelectItem>
                                                        <SelectItem value="Comondu">Comondú</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex space-x-2'>

                            </div>

                            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-5">Servicios a contratar</h3>
                            <div className='flex items-center space-x-8 mt-5'>
                                <div className='flex flex-col items-center'>
                                    {!campoAgua
                                        &&
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="c_agua"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Agua</FormLabel>
                                                        <FormControl>
                                                            <Switch
                                                                className='ml-2'
                                                                checked={field.value}
                                                                onCheckedChange={(checked) => field.onChange(checked)}
                                                            />
                                                        </FormControl>
                                                        <FormDescription />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>}

                                </div>
                                {!contrato2 &&
                                    <div>
                                        <div className='flex flex-col items-center'>
                                            <FormField
                                                control={form.control}
                                                name="c_alc"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Alcantarillado</FormLabel>
                                                        <FormControl>
                                                            <Switch
                                                                className='ml-2'
                                                                checked={field.value}
                                                                onCheckedChange={(checked) => onSwitchChange("c_alc", checked)}
                                                                disabled={contrato2}
                                                            />
                                                        </FormControl>
                                                        <FormDescription />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className='flex flex-col items-center'>
                                            <FormField
                                                control={form.control}
                                                name="c_san"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Saneamiento</FormLabel>
                                                        <FormControl>
                                                            <Switch
                                                                className='ml-2'
                                                                checked={field.value}
                                                                onCheckedChange={(checked) => onSwitchChange("c_san", checked)}
                                                                disabled={contrato2}
                                                            />
                                                        </FormControl>
                                                        <FormDescription />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>}

                            </div>











                            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-10">Tipo de Contratación y Giro de Negocio</h3>

                            <div className='flex space-x-4 mt-2'>



                                <div className='w-full mt-4'>
                                    <FormField
                                        control={form.control}
                                        name="tipo_contratacion"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tipo de contratación</FormLabel>
                                                <FormControl>
                                                    {
                                                        esPreContratado ?
                                                        <Select
                                                        disabled={true} // Ajusta esto según si el campo debe estar deshabilitado o no
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Actualiza el valor en react-hook-form
                                                        }}
                                                        value={field.value || ''} // Valor controlado por react-hook-form
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecciona el tipo de contratación" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                        <SelectItem value="pre-contrato">Pre-contrato</SelectItem>
                                                          
                                                        </SelectContent>
                                                    </Select>
                                                        :
                                                        <Select
                                                        disabled={false} // Ajusta esto según si el campo debe estar deshabilitado o no
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Actualiza el valor en react-hook-form
                                                        }}
                                                        value={field.value || ''} // Valor controlado por react-hook-form
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecciona el tipo de contratación" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                        <SelectItem value="normal">Normal</SelectItem>
                                                        <SelectItem value="condicionado">Condicionado</SelectItem>
                                                       
                                                        </SelectContent>
                                                    </Select>

                                                    }
                                                   
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
                                                    <GiroComercialComboBox form={form} field={field} name="id_giro_comercial" setCargoSeleccionado={setNombreGiroComercial} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>



                            </div>

                            <div className='flex justify-end'>
                                <Button type="submit" className='mt-10'>Guardar</Button>
                            </div>


                            {loading && <Loader />}
                            <div className="w-full flex justify-normal mt-4">

                                {

                                    <ModalDireccionToma
                                        setIsOpen={setOpenModal}
                                        isOpen={openModal}
                                        method1={detalleContratacion}
                                        method2={navegarDireccionToma} />
                                }
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
