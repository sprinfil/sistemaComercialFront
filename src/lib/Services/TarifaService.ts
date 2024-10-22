export interface TarifaServicio {
  id: number;
  id_tarifa: number;
  id_tipo_toma: number;
  detalle: TarifaServicioDetalle[];
};

export interface TarifaServicioDetalle {
  rango: number;
  agua: number,
  alcantarillado: number;
  saneamiento: number;
}

export const TarifaServicios: TarifaServicio = 
  {
    id: 1,
    id_tarifa: 1,
    id_tipo_toma: 1,
    detalle: [
      {rango: 17, agua: 215, alcantarillado: 300, saneamiento: 412},
      {rango: 34, agua: 415, alcantarillado: 300, saneamiento: 412},
      {rango: 51, agua: 515, alcantarillado: 300, saneamiento: 412},
      {rango: 68, agua: 615, alcantarillado: 300, saneamiento: 412},
      {rango: 85, agua: 715, alcantarillado: 300, saneamiento: 412},
    ]
  }


