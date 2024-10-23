import { useEffect } from "react";
import axiosClient from "../../axios-client";

export function getTomasPorPeriodo
  (
    setData: Function,
    setLoading: Function,
    periodoId: number
  ): void {

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosClient.get(`/validacion/periodo/${periodoId}`);
        console.log(response.data);
        setData(response.data);
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])
}

export async function establecerConsumo(
  consumo: number,
  idToma: number,
  idPeriodo: number,
  setError: Function,
  setLoading: Function,
  setConsumo: Function,
  setData: Function,
  cancelButtonRef: any
) {
  try {
    setLoading(true);
    const response = await axiosClient.post("/validacion/consumo/registrarconsumo",
      {
        id_toma: idToma,
        id_periodo: idPeriodo,
        consumo: consumo
      }
    );
    //console.log(response);
    setData(prev => {
      return [
        {
          ...response?.data?.consumo
        },
        ...prev,
      ];
    })
    cancelButtonRef.current.click();
    setConsumo(0);

  } catch (e) {
    setError(e.response.data.message);
  }
  finally {
    setLoading(false);
  }
}