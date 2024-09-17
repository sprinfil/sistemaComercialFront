import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const LIBRARIES: Array<'geometry' | 'places'> = ['geometry'];

const googleMapsApiKey = 'AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0'; // API KEY 

const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LoadScript
    googleMapsApiKey={googleMapsApiKey}
    libraries={LIBRARIES}
  >
    {children}
  </LoadScript>
);

export default GoogleMapsProvider;
