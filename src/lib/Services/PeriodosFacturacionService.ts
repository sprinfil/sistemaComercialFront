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
      finally{
        setLoadingRutas(false);
      }
    }
    load();
  }, []);

  return {loadingRutas}

}

export function loadPeriodosRuta(selectedRuta) {
  
}