import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

export function getCargaLectura(setCarga, id) {

  const [loadingCarga, setLoadingCarga] = useState(false);

  useEffect(() => {
    const fetchData = async ()  => {
      try {
        setLoadingCarga(true);
        const response = await axiosClient.get(`cargaTrabajo/show/${id}`);
        console.log(response.data.cargas_trabajo);
        setCarga(response.data.cargas_trabajo);
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

