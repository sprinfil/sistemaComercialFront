import React from 'react'

export const MonitorContratoMapa = () => {
    const apiKey = 'AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0'; 
    const lat = 37.7749; 
    const lng = -122.4194; 
    const zoom = 14; 
    const size = '600x300'; 
    const markerColor = 'red'; 
    const markerLabel = 'S'; 
  
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=${apiKey}`;
  

  return (
    <div>      
        <div>
        <img src={mapUrl} alt="Ubicación de la toma" />

        </div>

</div>
  )
}
