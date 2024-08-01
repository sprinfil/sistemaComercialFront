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

export const ModalImportarGeoJson = ({ trigger, updateData }) => {

    const { toast } = useToast()
    const [file, setFile] = useState(null);
    const [limpiar_poligonos, set_limpiar_poligonos] = useState(false);
    const {loading_import, set_loading_import} = PoligonosZustand();

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
                    console.log(json);
                    let nombres_rutas = [];
                    let nombres_libros = []

                    //obtener nombre de las rutas
                    json.features.forEach((object, index) => {
                        let name_ruta = object.properties.name;
                        let indexL = name_ruta.search(/[Ll]/);
                        if (indexL !== -1) {
                            name_ruta = name_ruta.substring(0, indexL);
                        }
                        nombres_rutas.push(name_ruta);
                        nombres_libros.push(object.properties.name);
                        nombres_libros[object.properties.name] = object.geometry.coordinates[0][0];
                        //console.log(object.geometry.coordinates[0][0]);
                    })
                    nombres_rutas = [...new Set(nombres_rutas)].sort();

                    /*
                        json.features.forEach((object, index) => {
                        let name_libro = object.properties.name;
                        let match = name_libro.match(/[Ll]/);
                        if (match) {
                            let indexL = name_libro.indexOf(match[0]);
                            name_libro = name_libro.substring(indexL);
                        }
                        nombres_libros.push(name_libro);
                    })
                    nombres_libros = [...new Set(nombres_libros)].sort();
                    console.log(nombres_libros)
                    */




                    const agrupados = nombres_rutas.reduce((acc, ruta) => {
                        acc[ruta] = Object.keys(nombres_libros)
                            .filter(libro => libro.startsWith(ruta))
                            .map(libro => ({ [libro]: nombres_libros[libro] }));
                        return acc;
                    }, {});

                    //console.log(values)
                    //console.log(nombres_libros)

                    let values = {
                        data: agrupados
                    }

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
                                /*description: response.response.data.message */
                                description: "A ocurrido un Error",
                                variant: "destructive",
                                action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                            })
                            set_loading_import(false);
                        })

                } catch (error) {
                    console.error("Error al parsear el archivo GeoJSON:", error);
                }
            };
            reader.readAsText(file);
        }
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Importar GeoJson</AlertDialogTitle>
                        <AlertDialogDescription>
                            Selecciona un archivo GeoJson para dar de alta polígonos
                            <div>
                                <div className='mt-[10px]'><input type="file" onChange={handleFileChange} /></div>
                                <div className='mt-[20px] flex gap-2'>
                                    <input type="checkbox" className='w-[20px]' onClick={() => { toggle_limpiar_poligonos(); }} />
                                    <p>Limpiar Los registros Actuales (esto eliminará todos los poligonos actuales)</p>
                                </div>
                            </div>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <div onClick={action}>
                            <AlertDialogAction>Aceptar</AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
