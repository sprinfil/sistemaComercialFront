import { Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({ set }) => {

  const [archivos, set_archivos] = useState([]);

  const onDrop = (acceptedFiles) => {
    // Aquí puedes manejar los archivos que fueron soltados
    set_archivos((prev) => {
      return [
        ...prev,
        ...acceptedFiles
      ]
    })
  };

  useEffect(() => {
    set(archivos);
    console.log(archivos)
  }, [archivos])

  const quitar_archivo = (key) => {

    const archivos_filtrados = archivos.filter((archivo, index) => index !== key);
    set_archivos(archivos_filtrados);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta los archivos aquí ...</p>
        ) : (
          <p>Arrastra y suelta los archivos aquí, o haz clic para seleccionar archivos</p>
        )}
      </div>
      {
        archivos.length > 0 &&
        <>
          <div className='border mt-3'>
            {archivos.map((archivo, index) => (
              <div className='my-1 px-2  flex justify-between' key={index}>
                {archivo.path}
                <Trash2Icon className='text-red-500 cursor-pointer' onClick={()=> {quitar_archivo(index)}} />
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
