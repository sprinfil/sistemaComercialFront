// useSortable.ts
import { group } from 'console';
import { useEffect, RefObject, useState } from 'react';
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import axiosClient from '../../axios-client';



// Custom Hook for Task Management
export function useTaskManagement() {
  const [conceptos, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
    console.log("hola")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosClient.get("/periodos")
        console.log(data.data);
        setTasks(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    conceptos,
    loading,
  };
}