// useSortable.ts
import { group } from 'console';
import { useEffect, RefObject } from 'react';
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

//Sortable.mount(new AutoScroll());

//INICIALIZAR SORTABLEJS
export const useSortable = (ref: RefObject<HTMLUListElement>, onEnd: (evt: any) => void) => {
  useEffect(() => {
    if (ref.current) {
      const sortable = Sortable.create(ref.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        group: "secuencia",
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
          //onEnd(evt);
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

  coords.map(coord => {
    newCoords.push({
      lat: coord[0][1],
      lng: coord[0][0]
    })
  })

  return { newCoords };
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