import React, { useState, useEffect, useCallback } from "react";
import { OcultarTable } from "../../../components/Tables/Components/OcultarTable";
import FiltrosContratacionPuntoToma from "../../OrdenesDeTrabajo/FiltrosContratacionPuntoToma";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
  InfoWindow
} from "@react-google-maps/api";
import axiosClient from "../../../axios-client";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import { ZustandFiltrosContratacion } from "../../../contexts/ZustandFiltrosContratacion";
import { useNavigate } from "react-router-dom";
import GoogleMapsProvider from "../../GoogleMapsProvider";
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

const mapContainerStyle = {
  width: "100%",
  height: "84vh",
};

const center = {
  lat: 24.131,
  lng: -110.3,
};

const PuntoTomaMapa = () => {
  const { setLatitudMapa, setLongitudMapa, setLibroToma, libroToma, setMarcadorSeleccionado, marcadorSeleccionado, 
    isCheckedPreContratada, puntosFiltradosParaElMapa, setTomaPreContratada,setSeleccionoPuntoEnMapa, selectedLocation, setSelectedLocation,setEsPreContratado} =
    ZustandFiltrosContratacion();
  const { toast } = useToast();
  const [poligonos, setPoligonos] = useState([]);
  const [mapaCargado, setMapaCargado] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [tomas_filtradas, set_tomas_filtradas] = useState([]);
  const navigate = useNavigate();
  const [promise, set_promise] = useState();

  
  const handleSiguienteContratacion = () => {
    navigate("/Contrato/Usuario");
    setEsPreContratado(true);
  };

  useEffect(() => {
    const mostrarPoligonos = async () => {
      setMapaCargado(false);
      try {
        const response = await axiosClient.get("/ruta");
        setPoligonos(response.data.data);
        setMapaCargado(true);
        console.log(response);
      } catch (error) {
        console.error("Error fetching polygons:", error);
        setMapaCargado(false);
      }
    };
    mostrarPoligonos();
  }, []);

  useEffect(() => {
    set_promise(puntosFiltradosParaElMapa)
  }, [puntosFiltradosParaElMapa])

  useEffect(() => {
    if (promise instanceof Promise) {
      promise
        .then((data) => {
          console.log(data.data.tomas);
          set_tomas_filtradas(data.data.tomas);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log('No es una promesa', promise);
    }
  }, [promise])


  useEffect(() => {
    return () => {
      setSeleccionoPuntoEnMapa(false); 
    };
  }, [setSeleccionoPuntoEnMapa]);


  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const clickedLocation = new google.maps.LatLng(lat, lng);
    setSelectedLocation({ lat, lng });
    setSeleccionoPuntoEnMapa(true);

    let isInsidePolygon = false;

    poligonos.forEach((polygon) => {
      polygon.libros.forEach((libro) => {
        if (
          libro.polygon?.coordinates &&
          libro.polygon.coordinates[0].length > 0
        ) {
          const polygonCoordinates = libro.polygon.coordinates[0].map(
            (coordinate) => ({
              lat: coordinate[1],
              lng: coordinate[0],
            })
          );

          const googlePolygon = new google.maps.Polygon({
            paths: polygonCoordinates.map(
              (coord) => new google.maps.LatLng(coord.lat, coord.lng)
            ),
          });

          if (
            google.maps.geometry.poly.containsLocation(
              clickedLocation,
              googlePolygon
            )
          ) {
            isInsidePolygon = true;
            setSelectedLocation({ lat, lng });
            setSeleccionoPuntoEnMapa(true);

          }
        }
      });
    });

    if (!isInsidePolygon) {
      toast({
        variant: "destructive",
        title: "No hay factibilidad",
        description: "Puedes continuar el proceso de contratación si lo deseas.",
      })
    }
    setSeleccionoPuntoEnMapa(true);
  };


  const handleMapLoad = (map) => {
    setMapaCargado(true);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }



  return (
    <div>
      <div className="flex space-x-2">
        <div className="mb-5">
          <OcultarTable accion={""}>
            <FiltrosContratacionPuntoToma />
          </OcultarTable>
        </div>

        <div style={{ flex: 1 }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            onClick={handleMapClick}
            onLoad={onLoad}
            onUnmount={onUnmount}

          >
            {selectedLocation && <Marker position={selectedLocation} />}


            {poligonos.map((polygon, index) =>
              polygon.libros.map((libro, libroIndex) => {
                if (
                  libro.polygon?.coordinates &&
                  libro.polygon.coordinates[0].length > 0
                ) {
                  const polygonCoordinates = libro.polygon.coordinates[0].map(
                    (coordinate) => ({
                      lat: coordinate[1],
                      lng: coordinate[0],
                    })
                  );

                  return (
                    <>
                      <Polygon
                        key={`polygon-${index}-${libroIndex}`}
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
                          setSelectedLocation({ lat, lng });
                          setSeleccionoPuntoEnMapa(true);
                          setLibroToma(libro.id);
                          console.log(libro.id);
                        }}
                      />

                      {libro.tomas?.map((toma, tomaIndex) => {
                        
                        if (tomas_filtradas?.some(filtrada => filtrada.id === toma.id)) {
                          

                          if (toma.posicion?.coordinates) {
                            const markerPosition = {
                              lat: toma.posicion.coordinates[1], // Latitud
                              lng: toma.posicion.coordinates[0], // Longitud
                            };

                            const marker = new google.maps.Marker({
                              position: markerPosition,
                              map: map,
                              title: `Toma: ${toma.codigo_toma}`,

                            });

                            const infoWindow = new google.maps.InfoWindow({
                              content: `<div class="text-black">
                                          <strong>Código de Toma: ${toma.codigo_toma}</strong></br>
                                          <strong>Clave Catastral: ${toma.clave_catastral}</strong></br>
                                          <strong>Calle: ${toma.calle}</strong></br>
                                          <strong>Número de casa: ${toma.numero_casa}</strong></br>
                                          <strong>Colonia: ${toma.colonia}</strong></br>
                                          <strong>Código Postal: ${toma.codigo_postal}</strong></br>
                                          <br>
                                          <button id="view-details-btn" class="text-green-800 text-xl"><strong>Contratar esta toma</strong></button>
                                        </div>`,
                            });
                            infoWindow.addListener('domready', () => {
                              document.getElementById('view-details-btn')?.addEventListener('click', handleSiguienteContratacion);
                              setTomaPreContratada(toma);
                            });

                            marker.addListener('click', () => {
                              infoWindow.open(map, marker);
                            });



                            return null;
                          }
                        }








                        return null;
                      })}
                    </>
                  );
                }
                return null;
              })
            )}


          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default PuntoTomaMapa;
