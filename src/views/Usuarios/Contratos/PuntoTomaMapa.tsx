import React, { useState, useEffect } from 'react';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable';
import FiltrosContratacionPuntoToma from '../../OrdenesDeTrabajo/FiltrosContratacionPuntoToma';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import axiosClient from '../../../axios-client';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { ZustandFiltrosContratacion } from '../../../contexts/ZustandFiltrosContratacion';
import { useNavigate } from "react-router-dom";
import GoogleMapsProvider from '../../GoogleMapsProvider';
const mapContainerStyle = {
  width: '100%',
  height: '84vh',
};

const center = {
  lat: 24.131,
  lng: -110.3,
};

const PuntoTomaMapa = () => {
  const { setLatitudMapa, setLongitudMapa, setLibroToma, libroToma } = ZustandFiltrosContratacion();
  const { toast } = useToast();
  const [poligonos, setPoligonos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapaCargado, setMapaCargado] = useState(false);

  const navigate = useNavigate();

  const handleSiguienteContratacion = () => {
    navigate("/Contrato/Usuario");
  };

  useEffect(() => {
    const mostrarPoligonos = async () => {
      setMapaCargado(false);
      try {
        const response = await axiosClient.get('/ruta');
        setPoligonos(response.data.data);
        setMapaCargado(true);
      } catch (error) {
        console.error('Error fetching polygons:', error);
        setMapaCargado(false);
      }
    };
    mostrarPoligonos();
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const clickedLocation = new google.maps.LatLng(lat, lng);
    let isInsidePolygon = false;

    poligonos.forEach((polygon) => {
      polygon.libros.forEach((libro) => {
        if (libro.polygon?.coordinates && libro.polygon.coordinates[0].length > 0) {
          const polygonCoordinates = libro.polygon.coordinates[0].map(coordinate => ({
            lat: coordinate[1],
            lng: coordinate[0],
          }));

          const googlePolygon = new google.maps.Polygon({
            paths: polygonCoordinates.map(coord => new google.maps.LatLng(coord.lat, coord.lng)),
          });

          if (google.maps.geometry.poly.containsLocation(clickedLocation, googlePolygon)) {
            isInsidePolygon = true;
            setSelectedLocation({ lat, lng });
          }
        }
      });
    });

    if (!isInsidePolygon) {
      toast({
        variant: "destructive",
        title: <div className='text-xl'>No hay factibilidad</div>,
        description: <div className='text-md'>¿Desea iniciar el proceso de contratación?</div>,
        action: <ToastAction altText="Try again" onClick={handleSiguienteContratacion}><div className='text-md'>Iniciar contratación</div></ToastAction>,
        autoClose: false, 
        className: "w-[400px] h-[150px] left-0 transform -translate-x-5"
      });
    }
  };

  const handleMapLoad = (map) => {
    setMapaCargado(true);
  };

  return (
    <div>
      <div className='flex space-x-2'>
        <div className='mb-5'>
          <OcultarTable accion={""}>
            <FiltrosContratacionPuntoToma />
          </OcultarTable>
        </div>

        <div style={{ flex: 1 }}>
          <GoogleMapsProvider>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
              onClick={handleMapClick}
              onLoad={handleMapLoad}
            >
              {selectedLocation && (
                <Marker position={selectedLocation} />
              )}
              {poligonos.map((polygon, index) =>
                polygon.libros.map((libro, libroIndex) => {
                  if (libro.polygon?.coordinates && libro.polygon.coordinates[0].length > 0) {
                    const polygonCoordinates = libro.polygon.coordinates[0].map(coordinate => ({
                      lat: coordinate[1],
                      lng: coordinate[0],
                    }));

                    return (
                      <Polygon
                        key={`${index}-${libroIndex}`}
                        paths={polygonCoordinates}
                        options={{
                          fillColor: '#00913f ',
                          fillOpacity: 0.4,
                          strokeColor: '#00913f ',
                          strokeOpacity: 1,
                          strokeWeight: 2,
                          clickable: true,
                        }}
                        onClick={(event) => {
                          const lat = event.latLng.lat();
                          const lng = event.latLng.lng();
                          setLongitudMapa(lat);
                          setLatitudMapa(lng);
                          setSelectedLocation({ lat, lng });
                          setLibroToma(libro.id);
                        }}
                      />
                    );
                  }
                  return null;
                })
              )}
            </GoogleMap>
          </GoogleMapsProvider>
        </div>
      </div>
    </div>
  );
};

export default PuntoTomaMapa;
