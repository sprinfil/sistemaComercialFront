import { useEffect } from "react";
import axiosClient from "../../axios-client";


export function getFacturacionesToma(
  setLoading: Function,
  setFacturaciones: Function,
  tomaId: number,
  setError: Function
) {

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosClient.post(`factura/toma/${tomaId}`);
        console.log(response.data);
        setFacturaciones(response.data)
      } catch (e) {
        console.log(e);
        setError(e);
      }
      finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])
}   