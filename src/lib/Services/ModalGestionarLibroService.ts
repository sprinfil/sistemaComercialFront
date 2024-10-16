// useSortable.ts
import { group } from 'console';
import { useEffect, RefObject, useState } from 'react';
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
import { GoogleMap, LoadScript, Polygon, Polyline } from "@react-google-maps/api";
import axiosClient from '../../axios-client';
import grifo from "../../img/grifo-de-agua.png"
import grifoPrimero from "../../img/grifo-de-agua-primero.png"
import grifoUltimo from "../../img/grifo-de-agua-ultimo.png"
//Sortable.mount(new AutoScroll());

//INICIALIZAR SORTABLEJS
export const useSortable = (ref: RefObject<HTMLUListElement>, onEnd: (evt: any) => void) => {
  useEffect(() => {
    if (ref.current) {
      const sortable = Sortable.create(ref.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        group: "secuencia",
        sort: true,
        onEnd: (evt) => {
          //console.log(evt);
          onEnd(evt);
        },

      });
      return () => {
        sortable.destroy();
      };
    }
  }, [ref, onEnd]);
};

//INICIALIZAR SORTABLEJS2
export const useSortable2 = (ref: RefObject<HTMLUListElement>, onEnd: (evt: any) => void) => {
  useEffect(() => {
    if (ref.current) {
      const sortable = Sortable.create(ref.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        group: {
          name: "secuencia",   // Nombre del grupo
          pull: true,        // Permite arrastrar fuera a la otra lista
          put: false,            // Permite soltar elementos de la otra lista aquí
        },
        onEnd: (evt) => {
          console.log(evt.to.id);
          onEnd(evt);
        },
      });
      return () => {
        sortable.destroy();
      };
    }
  }, [ref, onEnd]);
};

//OBTENER EL CENTRO DE UN POLIGONO
export function useGetCenterMap(libroCoords: any) {
  try {
    const bounds = new google.maps.LatLngBounds();

    libroCoords.forEach(coord => {
      bounds.extend(new google.maps.LatLng(coord[0][1], coord[0][0]));
    });

    const center = bounds.getCenter();

    return { center };
  } catch (e) {
    console.log(e);
    return { center: null };
  }
}

//FORMATEAR LAS COORDENADAS DEL LIBRO
export function useFormatCoords(coords) {
  let newCoords: any = [];
  console.log(coords)

  coords[0].map(coord => {
    newCoords.push({
      lat: parseFloat(coord[1]),
      lng: parseFloat(coord[0])
    })
  })

  return { newCoords };
}
// Custom Hook for Task Management
export async function updateSecuencia(secuenciaTemp, secuenciaOrden, setLoading, setEditandando, setRutas, setSecuencia) {

  setLoading(true);
  let secuencia =
  {
    id: secuenciaTemp?.id,
    tipo_secuencia: "padre",
    id_libro: secuenciaTemp?.id_libro
  }

  let secuencia_ordenes = [
    ...secuenciaOrden
  ]

  let data = {
    secuencia: secuencia,
    secuencia_ordenes: secuencia_ordenes
  }
  const secuenciaOrdenada = secuenciaOrden.sort((a, b) => a.numero_secuencia - b.numero_secuencia);
  console.log(secuenciaOrdenada)
  try {

    let response = await axiosClient.post("secuencia/crear", data);
    setRutas(prev => {
      return prev.map(ruta => {
        return {
          ...ruta,
          libros: ruta.libros.map(libro => {
            if (libro.id === secuenciaTemp?.id_libro) {
              return {
                ...libro,
                secuencias: [
                  {
                    ...libro.secuencias[0],
                    ordenes_secuencia: secuenciaOrdenada,
                  },
                  ...libro.secuencias.slice(1),
                ]
              };
            } else {
              return libro;
            }
          })
        };
      });
    });
    setEditandando(false);
    //localStorage.setItem("secuenciaTemp", JSON.stringify(secuenciaOrden));
  } catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
    setSecuencia(secuenciaOrden)
  }
}

export async function moverPosicionLibro(nuevaPosicion, secuencia, setSecuencia, antiguaPosicion, setLoading, setRutas, libroId) {
  setLoading(true); // Mostrar el indicador de carga

  // Simulamos la "petición" usando setTimeout
  await new Promise(resolve => setTimeout(resolve, 5));
  const nuevaSecuencia = [...secuencia];

  const oldIndex = antiguaPosicion;
  const newIndex = nuevaPosicion;

  const elementoMovido = nuevaSecuencia.find(orden => orden.numero_secuencia === oldIndex);

  if (elementoMovido) {
    nuevaSecuencia.forEach(orden => {
      if (orden.numero_secuencia === oldIndex) {
        orden.numero_secuencia = newIndex;
      } else if (
        oldIndex < newIndex &&
        orden.numero_secuencia > oldIndex &&
        orden.numero_secuencia <= newIndex
      ) {
        orden.numero_secuencia -= 1;
      } else if (
        oldIndex > newIndex &&
        orden.numero_secuencia < oldIndex &&
        orden.numero_secuencia >= newIndex
      ) {
        orden.numero_secuencia += 1;
      }
    });
  }

  const secuenciaOrdenada = nuevaSecuencia.sort((a, b) => a.numero_secuencia - b.numero_secuencia);

  setRutas(prev => {
    return prev.map(ruta => {
      return {
        ...ruta,
        libros: ruta.libros.map(libro => {
          if (libro.id === libroId) {
            return {
              ...libro,
              secuencias: [
                {
                  ...libro.secuencias[0],
                  ordenes_secuencia: secuenciaOrdenada,
                },
                ...libro.secuencias.slice(1),
              ]
            };
          } else {
            return libro;
          }
        })
      };
    });
  });

  setSecuencia(secuenciaOrdenada);

  setLoading(false);
}

//INICIALIZAR MAPA DE SECUENCIAS
export function initMapa(libroCoords, center, tomas) {
  const path: any = [];
  const google = (window as any).google;
  let map = new google.maps.Map(document.getElementById("mapa_google") as HTMLElement, {
    center: center,
    zoom: 17,
  });

  new window.google.maps.Polygon({
    paths: libroCoords,
    fillColor: "lightBlue",
    fillOpacity: 0.5,
    strokeColor: "blue",
    strokeOpacity: 0.4,
    strokeWeight: 2,
    map: map
  });

  tomas.sort((a, b) => a.numero_secuencia - b.numero_secuencia);

  tomas.map((secuencia, index) => {
    let urlTemp = "";
    if (tomas.length == 1) {
      urlTemp = grifo;
    }
    if (tomas.length > 1 && index < tomas.length && index > 0) {
      urlTemp = grifo;
    }
    if (tomas[0] == secuencia && tomas.length > 1) {
      urlTemp = grifoPrimero;
    }
    if (tomas[tomas.length - 1] == secuencia && tomas.length > 1) {
      urlTemp = grifoUltimo;
    }

    const latLng = { lat: secuencia?.toma.posicion?.coordinates[1], lng: secuencia?.toma.posicion?.coordinates[0] };
    path.push(latLng);
    new window.google.maps.Marker({
      position: { lat: secuencia?.toma.posicion?.coordinates[1], lng: secuencia?.toma.posicion?.coordinates[0] },
      map: map,
      label: {
        text: `Pos: ${secuencia?.numero_secuencia} Toma: ${secuencia?.toma.codigo_toma}`, // Puedes usar el índice o un valor específico de `toma`
        color: 'black',
        fontSize: '16px'
      },
      icon: {
        url: `${urlTemp}`,
        scaledSize: new google.maps.Size(35, 35),
        anchor: new google.maps.Point(25, 25)
      }
    });
  })

  let polyTemp = new window.google.maps.Polyline({
    path: path,
    geodesic: true,
    strokeColor: 'red',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    map: map
  });
}

//INICIALIZAR MAPA 2
export function initMapaIndicaciones(libroCoords, center, tomas) {
  const google = (window as any).google;
  const map = new google.maps.Map(document.getElementById("mapa_google") as HTMLElement, {
    center: center,
    zoom: 17,
  });

  new google.maps.Polygon({
    paths: libroCoords,
    fillColor: "lightBlue",
    fillOpacity: 0.5,
    strokeColor: "blue",
    strokeOpacity: 0.4,
    strokeWeight: 2,
    map: map
  });

  tomas.sort((a, b) => a.numero_secuencia - b.numero_secuencia);

  // Usar DirectionsService y DirectionsRenderer
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: 'red',
      strokeOpacity: 0.8,
      strokeWeight: 3,
    },
    map: map,
  });

  const path = [];
  const markers = []; // Para almacenar los marcadores


  tomas.forEach((secuencia, index) => {
    const latLng = {
      lat: secuencia.toma.posicion.coordinates[1],
      lng: secuencia.toma.posicion.coordinates[0],
    };

    path.push(latLng); // Agregar la posición al camino

    // Crear un marcador para cada toma
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      label: {
        text: `Pos: ${secuencia.numero_secuencia} Toma: ${secuencia.toma.codigo_toma}`,
        color: 'black',
        fontSize: '16px',
      },
      icon: {
        url: getIconUrl(tomas, index), // Función para obtener la URL del icono
        scaledSize: new google.maps.Size(35, 35),
        anchor: new google.maps.Point(25, 25),
      }
    });

    markers.push(marker); // Almacenar el marcador
  });

  // Dibujar caminos entre las tomas
  for (let i = 0; i < path.length - 1; i++) {
    drawRoute(directionsService, path[i], path[i + 1]);
  }
}

// Función para dibujar la ruta entre dos puntos
function drawRoute(directionsService, origin, destination) {
  console.log(origin)
  console.log(destination)
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING, // Puedes cambiar a WALKING, BICYCLING, etc.
    },
    (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
     
        // Agregar la dirección a la representación
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(window.google.maps.Map);
        directionsRenderer.setDirections(response);
      } else {
        console.error("Error al obtener la dirección: " + status);
      }
    }
  );
}

// Función para obtener la URL del icono según la posición
function getIconUrl(tomas, index) {
  if (tomas.length === 1) {
    return grifo; // URL para un solo marcador
  }
  if (index === 0) {
    return grifoPrimero; // URL para el primer marcador
  }
  if (index === tomas.length - 1) {
    return grifoUltimo; // URL para el último marcador
  }
  return grifo; // URL para los marcadores intermedios
}


// Custom Hook for Task Management
export function useTaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    tasks,
    loading,
  };
}