import React, { useState, useEffect, useCallback, useRef } from "react";
import { OcultarTable } from "../../../components/Tables/Components/OcultarTable";
import FiltrosContratacionPuntoToma from "../../OrdenesDeTrabajo/FiltrosContratacionPuntoToma";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import axiosClient from "../../../axios-client";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import { ZustandFiltrosContratacion } from "../../../contexts/ZustandFiltrosContratacion";
import { useNavigate } from "react-router-dom";

const mapContainerStyle = {
  width: "100%",
  height: "84vh",
};

const center = {
  lat: 24.131,
  lng: -110.3,
};

const PuntoTomaMapa = () => {
  const {
    setLatitudMapa,
    setLongitudMapa,
    setLibroToma,
    libroToma,
    setMarcadorSeleccionado,
    marcadorSeleccionado,
    isCheckedPreContratada,
    puntosFiltradosParaElMapa,
    setTomaPreContratada,
    setSeleccionoPuntoEnMapa,
    selectedLocation,
    setSelectedLocation,
    setEsPreContratado,
    setPuntoTomaLatitudLongitudAPI,
    puntoTomaLatitudLongitudAPI,
    setBoolPeticionContratacion
  } = ZustandFiltrosContratacion();

  const { toast } = useToast();
  const [poligonos, setPoligonos] = useState([]);
  const [tomasFiltradas, setTomasFiltradas] = useState([]);
  const [map, setMap] = useState(null);
  const markerRefs = useRef([]);

  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0",
  });

  useEffect(() => {
    const fetchPoligonos = async () => {
      try {
        const response = await axiosClient.get("/ruta");
        setPoligonos(response.data.data);
      } catch (error) {
        console.error("Error fetching polygons:", error);
      }
    };
    fetchPoligonos();
  }, []);

  useEffect(() => {
    if (puntosFiltradosParaElMapa instanceof Promise) {
      puntosFiltradosParaElMapa
        .then((data) => setTomasFiltradas(data.data.tomas))
        .catch((e) => console.log(e));
    } else {
      setTomasFiltradas(puntosFiltradosParaElMapa.data?.tomas || []);
    }
  }, [puntosFiltradosParaElMapa]);

  useEffect(() => {
    return () => setSeleccionoPuntoEnMapa(false);
  }, [setSeleccionoPuntoEnMapa]);

  const handleMapClick = useCallback((event) => {
    console.log("Map clicked", event);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    if (selectedLocation) {
      setSelectedLocation(null);
      setPuntoTomaLatitudLongitudAPI([]);
      setSeleccionoPuntoEnMapa(false);
    }

    const clickedLocation = new google.maps.LatLng(lat, lng);
    setSelectedLocation({ lat, lng });
    setPuntoTomaLatitudLongitudAPI([lat, lng]);
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
            setPuntoTomaLatitudLongitudAPI([lat, lng]);
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
      });
    }
    setSeleccionoPuntoEnMapa(true);

  }, [poligonos, setPuntoTomaLatitudLongitudAPI, setSeleccionoPuntoEnMapa, setSelectedLocation, toast]);

console.log(selectedLocation);

  const handleSiguienteContratacion = useCallback(() => {
    navigate("/Contrato/Usuario");
    setEsPreContratado(true);
    setBoolPeticionContratacion(false);
  }, [navigate, setEsPreContratado]);

  useEffect(() => {
    if (map) {
      markerRefs.current.forEach(marker => marker.setMap(null));
      markerRefs.current = [];
      setSelectedLocation(null);

      tomasFiltradas.forEach(toma => {
        if (toma.posicion?.coordinates) {
          const markerPosition = {
            lat: toma.posicion.coordinates[1],
            lng: toma.posicion.coordinates[0],
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

          markerRefs.current.push(marker);
        }
      });
    }
  }, [map, tomasFiltradas, handleSiguienteContratacion]);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }
  

  return (
    <div>
      <div className="flex space-x-2">
        <div className="">
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
                    <Polygon
                      key={`polygon-${index}-${libroIndex}`}
                      paths={polygonCoordinates}
                      options={{
                        fillColor: '#00913f',
                        fillOpacity: 0.4,
                        strokeColor: '#00913f',
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        clickable: true,
                      }}
                      onClick={(event) => {
                        const lat = event.latLng.lat();
                        const lng = event.latLng.lng();
                        const clickedLocation = new google.maps.LatLng(lat, lng);
                        setLatitudMapa(lat);
                        setLongitudMapa(lng);
                        setLibroToma(libro.id);
                        setSelectedLocation({ lat, lng });
                        setMarcadorSeleccionado(true);
                        setSeleccionoPuntoEnMapa(true);
                        setPuntoTomaLatitudLongitudAPI([lat, lng ]);

                      }}
                    />
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
