import { useEffect, useState } from "react";
import axiosClient from "../axios-client";


export function getMultas(setMultas) {

  // const [multas, setMultas] = useState([]);
  const [loadingMultas, setLoadingMultas] = useState(false);

  useEffect(() => {
    
    const fetchData = async ()  => {
      try {
        setLoadingMultas(true);
        const response = await axiosClient.get("/catalogomulta");
        console.log(response.data);
        setMultas(response.data);
        setLoadingMultas(false);
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

