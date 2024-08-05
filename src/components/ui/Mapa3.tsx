import React, { useEffect, useRef, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import PoligonosZustand from '../../contexts/PoligonosZustand';
import { useStateContext } from '../../contexts/ContextPoligonos';
import axiosClient from '../../axios-client';
import IconButton from './IconButton';
import { Pencil2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { HoverCard, HoverCardComponent } from './HoverCardComponent';
import "../../cursors/pencilselectcursor.cur";
import { LabelOverlay } from './MapLabel';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@radix-ui/react-toast'
import { Input } from './input';
import { Button } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';
import { BuscarTomaUsuario, Usuario } from '../Tables/Columns/ContratoConsultaTomaColumns';

export const Mapa3 = () => {
    const {  tomaUsuariosEncontrados,   setTomaUsuariosEncontrados} = ZustandGeneralUsuario();
    const { ruta_visibility, libro_visibility, loading_rutas, set_loading_rutas } = PoligonosZustand();
    const navigate = useNavigate();
    const { setRutas, rutas } = useStateContext();
    const [map, set_map] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [counter, set_counter] = useState(0);
    const [menuPosition, setMenuPosition] = useState(null);
    const [cursorStyle, setCursorStyle] = useState('default');
    const [editando, set_editando] = useState(false);
    const [overlays, setOverlays] = useState([]);
    const { toast } = useToast()
    const [searchQuery, setSearchQuery] = useState("");
    const search_input = useRef(null);

    const getRutas = async () => {
        set_loading_rutas(true);
        try {
            const response = await axiosClient.get("/ruta");
            setRutas(response.data.data);
            console.log(response.data.data)
            set_loading_rutas(false);
        } catch (error) {
            console.error("Error fetching rutas:", error.response?.data?.message || error.message);
            set_loading_rutas(false);
        }
    };

    useEffect(() => {
        if (rutas) {
            const loader = new Loader({
                apiKey: "AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0",
                version: "weekly",
            });

            loader.load().then(() => {
                const google = (window as any).google;
                let map_temp = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: { lat: 24.131, lng: -110.3 },
                    zoom: 13,
                });

                set_map(map_temp);

            });
        }

    }, []);

    useEffect(() => {

        polygons.forEach(polygon => {
            polygon.setMap(null);
        });
        overlays.forEach(overlay => overlay.onRemove());
        setPolygons([]);
        setOverlays([]);



        const newPolygons = rutas.map((ruta) => {

            class CustomLabel extends google.maps.OverlayView {

                constructor(position, text, color) {
                    super();
                    this.position = position;
                    this.text = text;
                    this.color = color;
                    this.div = null;
                }

                onAdd() {
                    const div = document.createElement("div");
                    div.style.position = "absolute";
                    div.style.zIndex = "1000";
                    //div.style.backgroundColor = "#c4c4c4";
                    //div.style.border = "1px solid black";
                    div.style.padding = "2px";
                    div.style.fontSize = "12px";
                    div.style.fontWeight = "bold";
                    div.style.color = "black";
                    div.innerHTML = this.text;
                    this.div = div;
                    const panes = this.getPanes();
                    panes.overlayLayer.appendChild(div);
                }

                draw() {
                    const overlayProjection = this.getProjection();
                    const position = overlayProjection.fromLatLngToDivPixel(this.position);
                    const div = this.div;
                    if (div) {
                        div.style.left = `${position.x}px`;
                        div.style.top = `${position.y}px`;
                    }
                }

                onRemove() {
                    if (this.div) {
                        this.div.parentNode.removeChild(this.div);
                        this.div = null;
                    }
                }
            }

            return ruta.libros.map((libro) => {

                if (libro.polygon && libro_visibility[libro.id] && libro.polygon.coordinates[0].length > 0 && !loading_rutas) {

                    let polygonCoordinates = libro.polygon.coordinates[0].map((punto) => (
                        {
                            lat: punto[1],
                            lng: punto[0]
                        }
                    ));

                    const polygon = new google.maps.Polygon({
                        map: map,
                        paths: polygonCoordinates,
                        strokeColor: ruta.color,
                        fillColor: ruta.color,
                        fillOpacity: 0.2,
                        strokeOpacity: 0.2,
                        //draggable: true,
                        //editable: false,
                    });

                    // Obtener el centro del polígono
                    const bounds = new google.maps.LatLngBounds();
                    polygon.getPath().forEach(function (latlng) {
                        bounds.extend(latlng);
                    });
                    const center = bounds.getCenter();

                    // Crear y agregar el overlay al mapa
                    const labelOverlay = new CustomLabel(center, libro.nombre, ruta.color || "black"); // libro.nombre es un ejemplo de texto
                    labelOverlay.setMap(map);

                    polygon.addListener('click', (event) => {
                        const path = polygon.getPath();
                        const points = path.getArray().map((point) => ({
                            lat: point.lat(),
                            lng: point.lng()
                        }));

                        const values = {
                            puntos: points
                        }

                        /*
                            if (polygon.editable) {
                            polygon.setEditable(false);
                            polygon.setDraggable(false);
                            console.log(values);

                            axiosClient.post(`/libro/update_polygon/${libro.id}`, values)
                                .then((response) => {
                                    console.log(response)
                                    getRutas();
                                    
                                })
                                .catch((response) => {
                                    console.log(response);
                                    toast({
                                        title: "Error",
                                        description: "Error",
                                        description: "A ocurrido un Error",
                                        variant: "destructive",
                                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                                    })
                                });

                                } else {
                                    polygon.setEditable(true);
                                    polygon.setDraggable(true);
                                }
                        */


                        console.log(polygon.getDraggable());
                    });

                    if (libro.tomas.length > 0) {
                        libro.tomas.map((toma, index) => {
                            console.log(toma)

                            /* TOMA INFO */
                            const marker = new google.maps.Marker({
                                position: {
                                    lat: toma.posicion.coordinates[1], // Latitud
                                    lng: toma.posicion.coordinates[0]  // Longitud
                                },
                                map: map,
                                title: `Toma: ${toma.id_codigo_toma}`, // Puedes agregar un título o descripción si está disponible
                            });

                            // Crear una etiqueta utilizando InfoWindow
                            const infoWindow = new google.maps.InfoWindow({
                                content: `<div class="text-black">
                            <strong>Código de Toma: ${toma.id_codigo_toma}</strong></br>
                            <strong>Clave Catastral: ${toma.clave_catastral}</strong></br>
                            <strong>Código Postal: ${toma.codigo_postal}</strong></br>
                            <strong>Colonia: ${toma.colonia}</strong></br>
                            <strong>Número de casa: ${toma.numero_casa}</strong></br>
                            <button id="view-details-btn">Ver Detalles</button>
                            </div>`, // Texto de la etiqueta
                            });

                            // O mostrarla al hacer clic en el marcador
                            marker.addListener('click', () => {
                                infoWindow.open(map, marker);
                            });
                            // Agregar un listener para el botón dentro de la InfoWindow
                            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                                const button = document.getElementById('view-details-btn');
                                if (button) {
                                    button.addEventListener('click', () => {
                                        handleViewDetails(toma);
                                    });
                                }
                            });
                            /* TOMA INFO */
                        })
                    }

                    return { polygon, labelOverlay };
                }
                return null;
            }).filter(polygon => polygon !== null);
        }).flat();

        setPolygons(newPolygons.map(p => p.polygon));
        setOverlays(newPolygons.map(p => p.labelOverlay));

    }, [libro_visibility]);

    const toggle_modo_edicion = () => {
        set_editando(!editando);
    };

    const handleViewDetails = (toma) => {
        console.log(toma);
      
        
        const usuario: Usuario = {
            id: toma.usuario.id,
            nombre: toma.usuario.nombre,
            apellido_paterno: toma.usuario.apellido_paterno,
            apellido_materno: toma.usuario.apellido_materno,
            telefono: toma.usuario.telefono,
            correo: toma.usuario.correo,
            curp: toma.usuario.curp,
        }

        const tomaOb: BuscarTomaUsuario = {
            id: toma.id,
            clave_catastral: toma.clave_catastral,
            numero_casa: toma.numero_casa,
            colonia: toma.colonia,
            entre_calle_1: toma.entre_calle_1,
            entre_calle_2: toma.entre_calle_2,
            codigo_postal: toma.codigo_postal,
            localidad: toma.localidad,
            usuario: usuario
        };
        console.log(tomaOb)
    
        setTomaUsuariosEncontrados([tomaOb]);
        console.log(tomaUsuariosEncontrados);
        navigate("/usuario/toma");

    };

    // Esta función busca la toma por nombre
    const searchToma = () => {
        let foundToma = null;

        // Recorrer todas las rutas y sus libros para encontrar la toma
        rutas.forEach(ruta => {
            ruta.libros.forEach(libro => {
                libro.tomas.forEach(toma => {
                    if (toma.id_codigo_toma == searchQuery) {
                        /* TOMA INFO */
                        foundToma = toma;
                        const marker = new google.maps.Marker({
                            position: {
                                lat: toma.posicion.coordinates[1], // Latitud
                                lng: toma.posicion.coordinates[0]  // Longitud
                            },
                            map: map,
                            title: `Toma: ${toma.id_codigo_toma}`, // Puedes agregar un título o descripción si está disponible
                        });

                        // Crear una etiqueta utilizando InfoWindow
                        const infoWindow = new google.maps.InfoWindow({
                            content: `<div class="text-black">
                            <strong>Código de Toma: ${toma.id_codigo_toma}</strong></br>
                            <strong>Clave Catastral: ${toma.clave_catastral}</strong></br>
                            <strong>Código Postal: ${toma.codigo_postal}</strong></br>
                            <strong>Colonia: ${toma.colonia}</strong></br>
                            <strong>Número de casa: ${toma.numero_casa}</strong></br>
                            <button id="view-details-btn">Ver Detalles</button>
                            </div>`, // Texto de la etiqueta
                        });

                        infoWindow.open(map, marker);
                        // O mostrarla al hacer clic en el marcador
                        marker.addListener('click', () => {
                            infoWindow.open(map, marker);
                        });
                          // Agregar un listener para el botón dentro de la InfoWindow
                          google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                            const button = document.getElementById('view-details-btn');
                            if (button) {
                                button.addEventListener('click', () => {
                                    handleViewDetails(toma);
                                });
                            }
                        });
                        /* TOMA INFO */
                    }
                });
            });
        });

        if (foundToma) {
            // Centrar el mapa en la posición de la toma
            search_input.current.value = "";
            map.setCenter(new google.maps.LatLng(foundToma.posicion.coordinates[1], foundToma.posicion.coordinates[0]));

        } else {
            alert("Toma no encontrada");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchToma();
        }
    };

    return (
        <>
            <div className='max-h-[90vh] h-full relative '>
                {editando &&
                    <div className='absolute top-0 z-50 bg-green-500 text-white p-1'>
                        <p>Modo Edición</p>
                    </div>
                }
                {
                    /*
                    <div className='flex left-2 bottom-1 absolute bg-background z-50 w-[45%] border-border h-[35px] border'>
                        <div onClick={() => { toggle_modo_edicion() }}>
                        <IconButton><Pencil2Icon className='' /></IconButton>
                        </div>
                    </div>
                    */
                }
                <div className='w-full h-[6vh] bg-muted p-1 flex items-center  border border-border'>
                    <div className='flex gap-2 items-center'>
                        <MagnifyingGlassIcon />
                        <input value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type='text' className='bg-background p-1  outline-none'
                            placeholder='Buscar Toma ...'
                            ref={search_input}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={searchToma}>Buscar</button>

                    </div>

                </div>

                <div id="map" className='w-full h-[75vh]'>
                </div>
            </div>
        </>
    );
}
