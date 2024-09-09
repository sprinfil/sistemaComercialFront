import React, { useState, useRef, useEffect } from 'react';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable';
import FiltrosContratacionMonitor from '../../OrdenesDeTrabajo/FiltrosContratacionMonitor';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import axiosClient from '../../../axios-client';
import { Button } from '../../../components/ui/button';
import FiltrosContratacionPuntoToma from '../../OrdenesDeTrabajo/FiltrosContratacionPuntoToma';
import { FaSearch } from 'react-icons/fa';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { ZustandFiltrosContratacion } from '../../../contexts/ZustandFiltrosContratacion';



const MostrarFiltros = () => {
  return (
    <OcultarTable accion={""}>
      <FiltrosContratacionPuntoToma />
    </OcultarTable>
  );
};
const LIBRARIES = ['places'];

export const PuntoTomaMapa = () => {

  const {setLatitudMapa, setLongitudMapa, setLibroToma, libroToma} = ZustandFiltrosContratacion();
  const { toast } = useToast()
  const [poligonos, setPoligonos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapaCargado, setMapaCargado] = useState(false);
  console.log(JSON.stringify(libroToma));

  //CADA QUE SE RENDERICE EL COMPONENTE VA A MOSTRAR LOS POLIGONOS
  useEffect(() => {
    const mostrarPoligonos = async () => {
      setMapaCargado(false);
      try {
        const response = await axiosClient.get('/ruta');
        console.log(response);
        setPoligonos(response.data.data);
        setMapaCargado(true);
      } catch (error) {
        console.error('Error fetching polygons:', error);
      }
    };
    mostrarPoligonos();
  }, []);


  //ESTILOS DEL MAPA
  const mapContainerStyle = {
    width: '100%',
    height: '84vh',
  };

  const center = {
    lat: 24.131,
    lng: -110.3,
  };

  const googleMapsApiKey = 'AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0'; // API KEY 

  //METODO CLICK PARA EL MAPA
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const clickedLocation = new google.maps.LatLng(lat, lng);

    let isInsidePolygon = false; //para validar si estas dentro del polifono

    //iteracion de los poligonos
    poligonos.forEach((polygon) => {
      polygon.libros.forEach((libro) => {
        if (libro.polygon?.coordinates && libro.polygon.coordinates[0].length > 0) {

          // Convertir las coordenadas del polígono a objetos LatLng
          const polygonCoordinates = libro.polygon.coordinates[0].map(coordinate => ({
            lat: coordinate[1],
            lng: coordinate[0],
          }));

          // Crear el polígono de Google Maps
          const googlePolygon = new google.maps.Polygon({
            paths: polygonCoordinates.map(coord => new google.maps.LatLng(coord.lat, coord.lng)),
          });

          // AQUI HACE LA VALIDACION SI EXISTE EN EL POLIGONO EL CLICK
          if (google.maps.geometry.poly.containsLocation(clickedLocation, googlePolygon)) {
            isInsidePolygon = true;
            console.log("Clic dentro del polígono en:", { lat, lng });
            setSelectedLocation({ lat, lng }); 
      
          }
        }
      });
    });

    // SI NO ESTA DENTRO DEL POLIGONO(AQUI PUEDO METER LO DEL PROCESO DE FACTIBILIDAD(PARA QUE QUEDE COMO CONTRATO PENDIENTE))
    if (!isInsidePolygon) {
      toast({
        variant: "destructive",
        title: "No puedes seguir con el proceso de contratación.",
        description: "No hay factibilidad",
        action: <ToastAction altText="Try again" >Intentar de nuevo</ToastAction>,
      })
    }
  };

  return (
    <div>
      <div className='flex space-x-2'>

        <div className='mb-5'>
          <MostrarFiltros />
        </div>

        <div style={{ flex: 1 }}>
          
          <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            libraries={['geometry']}
            
          >
        
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
              onClick={handleMapClick}
            >
              {selectedLocation && (
                <Marker
                  position={selectedLocation}
                />
              )}


              {
          
              poligonos.map((polygon, index) => (
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
                          clickable: true, // Permitir clics en el polígono
                        }}
                        onClick={(event) => {
                          const lat = event.latLng.lat();
                          const lng = event.latLng.lng();
                          setLongitudMapa(lat); //VARIABLES DEL ZUSTAND PARA LATITUD Y LONGITUD SELECCIONADA DENTRO DEL MAPA
                          setLatitudMapa(lng);
                          console.log(lat, "     ", lng);
                          // Actualizar el marcador en el centro del clic dentro del polígono
                          setSelectedLocation({ lat, lng });
                          console.log("Libro clickeado:", libro);
                          setLibroToma(libro.id);
                        }}
                      />
                    );
                  }
                  return null;
                })
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

    </div>
  );
};
