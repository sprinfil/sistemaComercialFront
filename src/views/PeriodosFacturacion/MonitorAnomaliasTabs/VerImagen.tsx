import React from 'react'
import imagen from "../../../img/medidorAnomalia.png"
import imagen2 from "../../../img/medidorAnomalia2.jpg"

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export const VerImagen = () => {
  const images = [

    {
      original: imagen2,
      thumbnail: imagen2,
    },
  ];
  return (
    <div>
      <div className='w-full flex items-center justify-center  min-h-[75vh] '>
        <ImageGallery items={images}

        />
      </div>
    </div>
  )
}
