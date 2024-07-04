import React, { useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { TrashIcon, ContainerIcon, PlusIcon, Pencil2Icon, ReaderIcon } from '@radix-ui/react-icons';
import IconButton from './IconButton';

export const Mapa = () => {

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0",
            version: "weekly",
        });

        loader.load().then(async () => {
            const google = await (window as any).google;
            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: 24.131, lng: -110.3 },
                zoom: 13,
            });

            const polygonCoords: google.maps.LatLngLiteral[] = [
                { lat: 24.131, lng: -110.3 },
                { lat: 24.132, lng: -110.32 },
                { lat: 24.140, lng: -110.32 },
            ];

            const polygon = new google.maps.Polygon({
                paths: polygonCoords,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });

            // Agregar información adicional al polígono
            (polygon as any).customInfo = {
                name: "Mi Polígono",
                description: "Este es un polígono de ejemplo",
                id: 1
            };

            // Crear InfoWindow para el polígono
            const info = (polygon as any).customInfo;
            const infoWindowContent = `
            <div class="p-3 mb-[20px] text-[10px] text-black w-[400px]">
                    <p>${info.name}</p>
                    <p>${info.description}</p>
                    <p>${info.id}</p>
            </div>
        `;
            const infoWindow = new google.maps.InfoWindow({
                content: infoWindowContent,
            });

            // Posicionar el InfoWindow en el centro del polígono
            const bounds = new google.maps.LatLngBounds();
            polygonCoords.forEach(coord => bounds.extend(coord));
            const center = bounds.getCenter();

            infoWindow.setPosition(center);



            polygon.setMap(map);
            // Agregar evento de clic al polígono
            polygon.addListener("click", () => {
                infoWindow.open(map);
                const info = (polygon as any).customInfo;
            });
        });
    }, []);

    return (
        <div className='h-full'>
            <div id="map" className='w-full h-full rounded-md'></div>
        </div>
    )
}
