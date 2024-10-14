import { useEffect, useState } from "react";
import axiosClient from "../axios-client";


export function getMultas(setMultas) {

  // const [multas, setMultas] = useState([]);
  const [loadingMultas, setLoadingMultas] = useState(false);

  useEffect(() => {
    const fetchData = async ()  => {
      try {
        setLoadingMultas(true);
        const response = await axiosClient.get("/multas/monitormultas");
        console.log(response.data);
        setMultas(response.data);
      } catch (e) {
        console.log(e)
      }
      finally {
        setLoadingMultas(false);
      }
    }
    fetchData();
  }, [])

  return { loadingMultas};

}

