import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = () => {

  const [archivos, set_archivos] = useState([]);

  const onDrop = (acceptedFiles) => {
    // Aquí puedes manejar los archivos que fueron soltados
    set_archivos((prev) => {
      return [
        ...prev,
        ...acceptedFiles
      ]
    })

    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta los archivos aquí ...</p>
        ) : (
          <p>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos</p>
        )}
      </div>
      {
        archivos.length > 0 &&
        <>
          <div className='border mt-3'>
            {archivos.map((archivo, index) => (
              <div className='my-1 px-2' key={index}>
                {archivo.path}
              </div>
            ))}
          </div>
        </>
      }

    </>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #cccccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};

export default MyDropzone;
