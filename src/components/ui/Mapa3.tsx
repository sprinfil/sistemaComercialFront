import React, { useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

export const Mapa3 = () => {

    useEffect(() => {
        let map;
        const a = 24.131;
        const b = -110.3;
        const diff = 0.0033;

        const loader = new Loader({
            apiKey: "AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0",
            version: "weekly",
        });

        loader.load().then(() => {
            const google = (window as any).google;
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: 24.131, lng: -110.3 },
                zoom: 13,
            });

            const polygonCoordinates = [
                { lat: a - diff, lng: b - diff },
                { lat: a + diff, lng: b - diff },
                { lat: a + diff, lng: b + diff },
                { lat: a - diff, lng: b + diff }
            ];

            const polygon = new google.maps.Polygon({
                map: map,
                paths: polygonCoordinates,
                strokeColor: "blue",
                fillColor: "blue",
                fillOpacity: 0.4,
                draggable: true,
                editable: false,
                geodesic: true,
            });

            const infoWindow = new google.maps.InfoWindow();

            polygon.addListener('click', (event) => {
                const lat = event.latLng.lat();
                const lng = event.latLng.lng();
                //alert(`Polygon clicked at Latitude: ${lat} and Longitude: ${lng}`);
                if(polygon.editable){
                    polygon.setEditable(false);
                    polygon.setDraggable(false);
                }else{
                    polygon.setEditable(true);
                    polygon.setDraggable(true);
                }
                const contentString = `<div style="color:black;">Ruta 1</div>`;
                
                infoWindow.setContent(contentString);
                infoWindow.setPosition(event.latLng);
                //infoWindow.open(map);
            });

        });
    }, []);

    return (
        <div className='max-h-[80vh] h-full'>
            <div id="map" className='w-full h-full '></div>
        </div>
    );
}