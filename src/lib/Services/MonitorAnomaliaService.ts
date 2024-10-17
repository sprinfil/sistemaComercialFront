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