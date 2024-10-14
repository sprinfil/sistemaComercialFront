import { useEffect, useState } from "react";
import axiosClient from "../axios-client";


export function getCargaLectura(setCarga) {

  const [loadingCarga, setLoadingCarga] = useState(false);

  useEffect(() => {
    const fetchData = async ()  => {
      try {
        setLoadingCarga(true);
        const response = await axiosClient.get("/catalogomulta");
        console.log(response.data);
        setCarga(response.data);
      } catch (e) {
        console.log(e)
      }
      finally {
        setLoadingCarga(false);
      }
    }
    fetchData();
  }, [])

  return { loadingCarga};

}

