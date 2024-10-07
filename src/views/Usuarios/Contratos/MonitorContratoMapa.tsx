import React from 'react'

export const MonitorContratoMapa = ({selected_contrato}) => {

  
    const apiKey = 'AIzaSyAnqFPxn8eq_QFwi9HES_LbnyuNmnhf2rA'; //API KEY
    const lat = selected_contrato?.toma?.posicion?.coordinates[0]; //LONGITUD
    const lng = selected_contrato?.toma?.posicion?.coordinates[1];  //LATITUD
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&zoom=19&q=${lng},${lat}`;

  return (
    <div>      
        <div>

        <iframe
        className='w-full'
      height="450"
      src={mapSrc}
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

        </div>

</div>
  )
}
