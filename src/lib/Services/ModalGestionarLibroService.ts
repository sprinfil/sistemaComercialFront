// useSortable.ts
import { group } from 'console';
import { useEffect, RefObject, useState } from 'react';
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
import { GoogleMap, LoadScript, Polygon, Polyline } from "@react-google-maps/api";
import axiosClient from '../../axios-client';
import grifo from "../../img/grifo-de-agua.png"

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
        group: "secuencia",
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

  } catch (e) {
    console.log(e);
  }
  finally {
    setLoading(false);
    setEditandando(false);
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
  const path : any = [];
  const google = (window as any).google;
  let map = new google.maps.Map(document.getElementById("mapa_google") as HTMLElement, {
    center: center,
    zoom: 17,
  });

  new window.google.maps.Polygon({
    paths: libroCoords,
    fillColor: "lightBlue",
    fillOpacity: 0.3,
    strokeColor: "blue",
    strokeOpacity: 0.0,
    strokeWeight: 2,
    map: map
  });

  console.log(tomas);
  tomas.sort((a, b) => a.numero_secuencia - b.numero_secuencia);

  tomas.map(secuencia => {

    const latLng = { lat: secuencia?.toma.posicion?.coordinates[1], lng: secuencia?.toma.posicion?.coordinates[0] };
    path.push(latLng);
    new window.google.maps.Marker({
      position: { lat: secuencia?.toma.posicion?.coordinates[1], lng: secuencia?.toma.posicion?.coordinates[0] },
      map: map,
      // icon: {
      //   url: 'URL_DE_TU_ICONO', // Reemplaza esto con la URL de tu ícono
      //   scaledSize: new window.google.maps.Size(32, 32) // Ajusta el tamaño si es necesario
      // }
      label: {
        text: `Pos: ${secuencia?.numero_secuencia} Toma: ${secuencia?.toma.codigo_toma}`, // Puedes usar el índice o un valor específico de `toma`
        color: 'black', // Color del texto
        fontSize: '16px' // Tamaño de la fuente
      },
      icon: {
        url: `${grifo}`,
        scaledSize: new google.maps.Size(35, 35),
        anchor: new google.maps.Point(25, 25)
      }
    });
  })
  
  // Dibuja la primera línea en azul
  if (path.length > 1) {
     let polyTemp = new window.google.maps.Polyline({
      path: [path[0], path[1]], // Solo conecta el primer y segundo punto
      geodesic: true,
      strokeColor: 'blue', // Color de la primera línea
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map: map
    });
  }

  // Dibuja la última línea en verde
  if (path.length > 1) {
    let polyTemp = new window.google.maps.Polyline({
      path: [path[path.length - 2], path[path.length - 1]], // Solo conecta el penúltimo y último punto
      geodesic: true,
      strokeColor: 'green', // Color de la última línea
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map: map
    });
  }

  // Dibuja las líneas intermedias (si las hay) en rojo
  if (path.length > 2) {
    let polyTemp = new window.google.maps.Polyline({
      path: path.slice(1, path.length - 1), // Conecta los puntos intermedios
      geodesic: true,
      strokeColor: 'red', // Color de las líneas intermedias
      strokeOpacity: 0.5,
      strokeWeight: 3,
      map: map
    });
  }
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