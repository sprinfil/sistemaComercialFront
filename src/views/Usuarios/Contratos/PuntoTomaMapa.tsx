import React,{useState, useRef, useEffect} from 'react';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable';
import FiltrosContratacionMonitor from '../../OrdenesDeTrabajo/FiltrosContratacionMonitor';
import { GoogleMap, LoadScript, Marker, Polygon  } from '@react-google-maps/api';
import axiosClient from '../../../axios-client';
import { Button } from '../../../components/ui/button';
import FiltrosContratacionPuntoToma from '../../OrdenesDeTrabajo/FiltrosContratacionPuntoToma';
import { FaSearch } from 'react-icons/fa';
const MostrarFiltros = () => {
  return (
    <OcultarTable accion={""}>
      <FiltrosContratacionPuntoToma />
    </OcultarTable>
  );
};

export const PuntoTomaMapa = () => {


    const [poligonos, setPoligonos] = useState([]);
    //CADA QUE SE RENDERICE EL COMPONENTE VA A MOSTRAR LOS POLIGONOS
    useEffect(() => {
        // Función para obtener datos desde tu backend
        const mostrarPoligonos = async () => {
          try {
            const response = await axiosClient.get('/ruta'); 
            console.log(response);
            setPoligonos(response.data.data);
          } catch (error) {
            console.error('Error fetching polygons:', error);
          }
        };
        mostrarPoligonos();
      }, []);





console.log(poligonos[0]?.libros[0]?.polygon.coordinates);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const mapRef = useRef(null);

  const mapContainerStyle = {
    width: '100%',   
    height: '84vh', 
  };

  const center = {
    lat: 24.131,
    lng: -110.3,
  };

  const googleMapsApiKey = 'AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0'; // API KEY 

  //METODO PARA QUE GUARLE LA LATITUD Y LONGITUD DEL MAPA
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newLocation = { lat, lng };
    setSelectedLocation(newLocation);
     // Mueve el mapa a la nueva ubicación
     // Mueve el mapa a la nueva ubicación
     if (mapRef.current) {
        mapRef.current.panTo(newLocation);
      }
  };
  const onLoad = (map) => {
    mapRef.current = map;
  };
console.log(selectedLocation);
  
  return (
    <div>

        <div className='flex space-x-2'>
        
        <div className='mb-5'>
        <MostrarFiltros />
        </div>

      <div style={{ flex: 1 }}>
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          loadingElement="async" 
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            onClick={handleMapClick} //MANEJADOR DEL EVENTO
            onLoad={onLoad}
          >
            {selectedLocation && (
              <Marker
                position={selectedLocation}
                //ESTE ES EL MARCADOR SI SE HIZO CLICK EN EL MAPA Y SE PONE
              />
            )}





        {poligonos.map((polygon, index) => (
              <Polygon
                key={index}
                paths={polygon.libros.polygon?.coordinates}
                options={{
                  fillColor: '#FF0000',
                  fillOpacity: 0.4,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            ))}
















          </GoogleMap>
        </LoadScript>
      </div>
        </div>
      
    </div>
  );
};
