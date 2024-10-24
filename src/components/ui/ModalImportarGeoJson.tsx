import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axiosClient from '../../axios-client';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@radix-ui/react-toast'
import PoligonosZustand from '../../contexts/PoligonosZustand';

export const ModalImportarGeoJson = ({ updateData, open, toggle_open}) => {

    const { toast } = useToast()
    const [file, setFile] = useState(null);
    const [limpiar_poligonos, set_limpiar_poligonos] = useState(false);
    const { loading_import, set_loading_import } = PoligonosZustand();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const toggle_limpiar_poligonos = () => {
        set_limpiar_poligonos((prevState) => {
            const newState = !prevState;
            return newState;
        });
    }

    const action = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    set_loading_import(true);
                    const json = JSON.parse(reader.result);
                    //console.log(json);
                    let nombres_rutas = [];
                    let nombres_libros = [];
                   
                   
                    //obtener nombre de las rutas
                    json.features.forEach((object, index) => {
                      
                        let name_ruta = object.properties.name;
                    
                        let indexL = name_ruta.search(/[Ll]/);
                        if (indexL !== -1) {
                            name_ruta = name_ruta.substring(0, indexL);
                        }
                        nombres_rutas.push(name_ruta);
                        nombres_libros.push(object.properties.name);
                        console.log(object.geometry.coordinates[0])

                        nombres_libros[object.properties.name] = object.geometry.coordinates[0][0];
                    })

                    nombres_rutas = [...new Set(nombres_rutas)].sort();

                    const agrupados = nombres_rutas.reduce((acc, ruta) => {
                        acc[ruta] = Object.keys(nombres_libros)
                            .filter(libro => libro.startsWith(ruta))
                            .map(libro => ({ [libro]: nombres_libros[libro] }));
                        return acc;
                    }, {});

                    let values = {
                        data: agrupados
                    }

                    if (limpiar_poligonos) {
                        axiosClient.post("/ruta/masive_polygon_delete")

                            .then((response) => {

                                axiosClient.post("/ruta/create_masive", values)
                                    .then((response) => {
                                        toast({
                                            title: "Exito",
                                            description: "Datos Importados Correctamente",
                                            variant: "success",
                                            action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                                        })
                                        set_loading_import(false);
                                        updateData();
                                    })
                                    .catch((response) => {
                                        console.log(response.response.data.message);
                                        toast({
                                            title: "Error",
                                            description: response.response.data.message ,
                                            //description: "A ocurrido un Error",
                                            variant: "destructive",
                                            action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                                        })
                                        set_loading_import(false);
                                    })

                            }).catch((response) => {
                                console.log(response.response.data.message);
                                toast({
                                    title: "Error",
                                    description: response.response.data.message ,
                                    //description: "A ocurrido un Error",
                                    variant: "destructive",
                                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                                })
                            })

                    } else {
                        axiosClient.post("/ruta/create_masive", values)
                            .then((response) => {
                                toast({
                                    title: "Exito",
                                    description: "Datos Importados Correctamente",
                                    variant: "success",
                                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                                })
                                set_loading_import(false);
                                updateData();
                            })
                            .catch((response) => {
                                console.log(response.response.data.message);
                                toast({
                                    title: "Error",
                                    description: response.response.data.message ,
                                    //description: "A ocurrido un Error",
                                    variant: "destructive",
                                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                                })
                                set_loading_import(false);
                            })
                    }
                    set_limpiar_poligonos(false);

                } catch (error) {
                    console.error("Error al parsear el archivo GeoJSON:", error);
                }
            };
            reader.readAsText(file);
        }
        toggle_open();
    }

    return (
        <div >
            <AlertDialog open ={open}>
                <AlertDialogTrigger></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Importar GeoJson</AlertDialogTitle>
                        <AlertDialogDescription>
                            Selecciona un archivo GeoJson para dar de alta polígonos
                            <div>
                                <div className='mt-[10px]'><input type="file" onChange={handleFileChange} /></div>
                                <div className='mt-[20px] flex gap-2'>
                                    <input type="checkbox" className='w-[20px]' onClick={() => { toggle_limpiar_poligonos(); }} />
                                    <p>Limpiar los registros Actuales (esto eliminará todos los polígonos actuales)</p>
                                </div>
                            </div>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={toggle_open}>Cancelar</AlertDialogCancel>
                        <div onClick={action}>
                            <AlertDialogAction>Aceptar</AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
