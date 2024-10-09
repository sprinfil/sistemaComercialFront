import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

export function loadRutas(setData) {
  const [loadingRutas, setLoadingRutas] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axiosClient.get("/ruta");
        setData(response.data.data);
        console.log(response.data.data)
      } catch (e) {
        console.log(e)
      }
      finally {
        setLoadingRutas(false);
      }
    }
    load();
  }, []);

  return { loadingRutas }

}

export function loadPeriodosRuta(selectedRuta) {
  const [periodos, setPeriodos] = useState([]);
  const [loadingPeriodos, setLoadingPeridos] = useState(false);

  useEffect(() => {
    const fectchPeriodos = async () => {
      try {
        setLoadingPeridos(true);
        const response = await axiosClient.get(`/periodos/show/${selectedRuta?.id}`);
        console.log(response.data.periodos)
        setPeriodos(response.data.periodos)
      } catch (e) {
        console.log(e);
      }
      finally{
        setLoadingPeridos(false);
      }
    }
    fectchPeriodos();
  }, [selectedRuta])

  return {periodos, loadingPeriodos};
}

export function newPeriodo(data) {
  console.log(data)
}