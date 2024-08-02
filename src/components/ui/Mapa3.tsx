import React, { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import PoligonosZustand from '../../contexts/PoligonosZustand';
import { useStateContext } from '../../contexts/ContextPoligonos';
import axiosClient from '../../axios-client';
import IconButton from './IconButton';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { HoverCard, HoverCardComponent } from './HoverCardComponent';
import "../../cursors/pencilselectcursor.cur";
import { LabelOverlay } from './MapLabel';

export const Mapa3 = () => {

    const { ruta_visibility, libro_visibility } = PoligonosZustand();
    const { setRutas, rutas } = useStateContext();
    const [map, set_map] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [counter, set_counter] = useState(0);
    const [menuPosition, setMenuPosition] = useState(null);
    const [cursorStyle, setCursorStyle] = useState('default');
    const [editando, set_editando] = useState(false);
    const [overlays, setOverlays] = useState([]);

    const getRutas = async () => {
        try {
            const response = await axiosClient.get("/ruta");
            setRutas(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.error("Error fetching rutas:", error.response?.data?.message || error.message);
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
                if (libro.Puntos && libro_visibility[libro.id]) {

                    let polygonCoordinates = libro.Puntos.map((punto) => ({
                        lat: punto.latitud,
                        lng: punto.longitud
                    }));

                    const polygon = new google.maps.Polygon({
                        map: map,
                        paths: polygonCoordinates,
                        strokeColor: ruta.color,
                        fillColor: ruta.color,
                        fillOpacity: 0.3,
                        strokeOpacity: 0.3,
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


                        if (polygon.editable) {
                            polygon.setEditable(false);
                            polygon.setDraggable(false);

                            axiosClient.post(`/asignacionGeografica/update_points/${libro.Puntos[0].id_asignacion_geografica}`, values)
                                .then((response) => {
                                    console.log(response)
                                    getRutas();
                                })
                                .catch((response) => {
                                    console.log(response);
                                });

                        } else {
                            polygon.setEditable(true);
                            polygon.setDraggable(true);
                        }
                        console.log(polygon.getDraggable());
                    });

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

                <div id="map" className='w-full h-[90vh]'>
                </div>
            </div>
        </>
    );
}
