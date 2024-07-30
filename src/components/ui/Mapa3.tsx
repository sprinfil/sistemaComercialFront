import React, { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import PoligonosZustand from '../../contexts/PoligonosZustand';
import { useStateContext } from '../../contexts/ContextPoligonos';
import { count } from 'console';

export const Mapa3 = () => {

    const { ruta_visibility, libro_visibility } = PoligonosZustand();
    const { setRutas, rutas } = useStateContext();

    useEffect(() => {
        //console.log(libro_visibility);
    }, [libro_visibility])

    useEffect(() => {
        if (rutas) {
            const a = 24.131;
            const b = -110.3;
            const diff = 0.0033;

            const loader = new Loader({
                apiKey: "AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0",
                version: "weekly",
            });

            loader.load().then(() => {
                const google = (window as any).google;
                let map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: { lat: 24.131, lng: -110.3 },
                    zoom: 13,
                });

                /* poligonos */

                rutas.forEach((ruta, index) => {
                    ruta.libros.forEach((libro, index) => {
                        if (libro.Puntos[0].id && libro_visibility[libro.id]) {
                            let polygonCoordinates = [];
                            libro.Puntos.forEach((punto) => {
                                polygonCoordinates.push({ lat: punto.latitud, lng: punto.longitud });
                            })
                            const polygon = new google.maps.Polygon({
                                map: map,
                                paths: polygonCoordinates,
                                strokeColor: ruta.color,
                                fillColor: ruta.color,
                                fillOpacity: 0.7,
                                draggable: true,
                                editable: false,
                            });

                            const infoWindow = new google.maps.InfoWindow();

                            polygon.addListener('click', (event) => {
                                const lat = event.latLng.lat();
                                const lng = event.latLng.lng();
                                const path = polygon.getPath()

                                const points = [];
                                path.forEach((point) => {
                                    points.push({
                                        lat: point.lat(),
                                        lng: point.lng()
                                    });
                                });

                                console.log(points);
                                //alert(`Polygon clicked at Latitude: ${lat} and Longitude: ${lng}`);
                                if (polygon.editable) {
                                    polygon.setEditable(false);
                                    polygon.setDraggable(false);
                                } else {
                                    polygon.setEditable(true);
                                    polygon.setDraggable(true);
                                }


                            })
                            /*
                                const contentString = `<div style="color:black;">${ruta.nombre}</div>
                            <div style="color:black;">${libro.nombre}</div>
                            `;
                            infoWindow.setContent(contentString);
                            const coords = {lat: libro.Puntos[0].latitud, lng: libro.Puntos[0].longitud}
                            infoWindow.setPosition(coords);
                            infoWindow.open(map);
                            */

                        }
                    })

                });


            });
        }

    }, [rutas, libro_visibility]);



    return (
        <div className='max-h-[80vh] h-full'>
            <div id="map" className='w-full h-full '></div>
        </div>
    );
}