import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

export function useFetchLecturas(tomaId) {
  const [lecturas, setLecturas] = useState([]);
  const [loadingLecturas, setLoadingLecturas] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosClient.get("/lectura",
          {
            params: {
              id_toma: tomaId
            }
          }
        )
        console.log(data.data);
        setLecturas(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingLecturas(false);
      }
    };

    fetchData();
  }, []);

  return {
    lecturas,
    loadingLecturas,
  };
}