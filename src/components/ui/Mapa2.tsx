import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polygon, DrawingManager } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -34.397,
    lng: 150.644
};

const Mapa2: React.FC = () => {
    const [polygons, setPolygons] = useState<any[]>([]);

    const onLoadPolygon = useCallback((polygon: google.maps.Polygon) => {
        setPolygons((polygons) => [...polygons, polygon]);
    }, []);

    const onUnmountPolygon = useCallback((polygon: google.maps.Polygon) => {
        setPolygons((polygons) => polygons.filter(p => p !== polygon));
    }, []);

    const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
        setPolygons((polygons) => [...polygons, polygon]);
    }, []);

    return (
        <div className='h-full'>
            <LoadScript googleMapsApiKey="AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0" libraries={['drawing']}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {polygons.map((polygon, index) => (
                        <Polygon
                            key={index}
                            paths={polygon.getPath().getArray().map(latlng => ({ lat: latlng.lat(), lng: latlng.lng() }))}
                            options={{
                                editable: true,
                                draggable: true,
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                            }}
                            onLoad={onLoadPolygon}
                            onUnmount={onUnmountPolygon}
                        />
                    ))}

                    <DrawingManager
                        onPolygonComplete={onPolygonComplete}
                        options={{
                            drawingControl: true,
                            drawingControlOptions: {
                                position: window.google?.maps.ControlPosition.TOP_CENTER,
                                drawingModes: [window.google?.maps.drawing.OverlayType.POLYGON],
                            },
                            polygonOptions: {
                                editable: true,
                                draggable: true,
                            },
                        }}
                    />
                </GoogleMap>
            </LoadScript>
        </div>

    );
};

export default Mapa2;

