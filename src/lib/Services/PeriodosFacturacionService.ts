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

export function loadPeriodosRuta(selectedRuta, setPeriodos) {

  const [loadingPeriodos, setLoadingPeridos] = useState(false);

  const fectchPeriodos = async () => {
    try {
      setLoadingPeridos(true);
      const response = await axiosClient.get(`/periodos/show/${selectedRuta?.id}`);
      setPeriodos(response.data.periodos)
    } catch (e) {
      console.log(e);
    }
    finally {
      setLoadingPeridos(false);
    }
  }

  useEffect(() => {
    if (selectedRuta?.nombre) {
      fectchPeriodos();
    }
  }, [selectedRuta])

  return { loadingPeriodos };
}

export async function newPeriodo(data, setError, setPeriodos, setOpen, setLoadingNewPeriodo) {
  try {
    setLoadingNewPeriodo(true);
    const response = await axiosClient.post("periodos/create", data);

    setPeriodos(prev => {
      return [response.data.periodos[0], ...prev];
    })
    setOpen(false);

  } catch (e) {
    setError(e.response.data.error);
  }
  finally {
    setLoadingNewPeriodo(false);
  }
}

export async function editPeriodo(data, setPeriodos, setDetalle, setLoadingEditPeriodo, setEditar, cerrarPeriodo = false, setError) {

  if (cerrarPeriodo) {
    const id = data?.periodos?.id;
    data = {
      periodos: {
        id: id,
        estatus: "cerrado"
      }
    }
  }

  console.log(data);

  try {
    setLoadingEditPeriodo(true);
    const response = await axiosClient.put(`periodos/update/${data?.periodos?.id}`, data);
    console.log(response.data.periodos);

    setPeriodos((prev) => {
      return prev.map(periodo => {
        if (periodo.id == data?.periodos?.id) {
          return response.data.periodos
        } else {
          return periodo;
        }
      })
    })
    setDetalle(response.data.periodos);
    setEditar(false);
  }
  catch (e) {
    console.log(e.response.data.error);
    setError(e.response.data.error);
  }
  finally {
    setLoadingEditPeriodo(false);
  }
}

export async function IniciarProcesoFacturacion(periodo) {
  try {
    const response = await axiosClient.post(`/factura/create/periodo`, {
      periodos: [
        {
          id: periodo?.id
        },
      ]
    });
    console.log(response);
  }
  catch (e) {
    console.log(e);
  }
}