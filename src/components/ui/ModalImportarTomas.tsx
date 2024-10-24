
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { string } from 'zod';
import Modal from './Modal';
import axiosClient from '../../axios-client';
import { toast, useToast } from './use-toast';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';

const containerStyle = {
  width: '100%',
  height: '58vh',
};


const center = {
  lat: 24.14246684814462,
  lng: -110.31311923226528,
};


// Lista de marcadores (puedes obtener estos datos desde tu backend o un archivo)
const tomas = [
  { id: 1, position: { lat: 40.712776, lng: -74.005974 }, name: 'New York' },
  { id: 2, position: { lat: 34.052235, lng: -118.243683 }, name: 'Los Angeles' },
  { id: 3, position: { lat: 41.878113, lng: -87.629799 }, name: 'Chicago' },
];


interface ModalProps {
  children: React.ReactNode;
}
const ModalImportarTomas: React.FC<ModalProps> = ({ trigger }) => {
  const { toast } = useToast();
  const [excelData, setExcelData] = useState([]);
  const [tomas, set_tomas] = useState([]);
  const [ver_mapa, set_ver_mapa] = useState(false);
  const { usuariosEncontrados, setTomas } = ZustandGeneralUsuario();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Usamos la primera hoja
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convertir a JSON

      // Actualizar el estado con los datos del Excel
      setExcelData(data);
      console.log(data)
    };

    reader.readAsBinaryString(file); // Leer el archivo Excel como cadena binaria
  };

  useEffect(() => {
    let tomas_temp = [];

    excelData.map((data, index) => {

      if (index != 0 && data[1] != null) {

        tomas_temp.push(
          {
            position: { lat: parseFloat(data[15]), lng: parseFloat(data[16]) },
            posicion: [data[15], data[16]],
            clave_catastral: String(data[1]),
            id_usuario: usuariosEncontrados[0]?.id,
            id_giro_comercial: 2,
            nombre: String(data[0]),
            id_tipo_toma: 1,
            colonia: 1,
            calle: 1,
            municipio: String(data[4]),
            localidad: String(data[5]),
            entre_calle_1: 1,
            entre_calle_2: 1,
            numero_casa: String(data[8]),
            direccion_notificacion: String(data[9]),
            codigo_postal: String(data[10]),
            diametro_toma: String(data[11]),
            c_agua: String(data[12]),
            c_alc: String(data[13]),
            c_san: String(data[14])
          }
        )
      }
    })

    set_tomas(tomas_temp)
  }, [excelData])

  useEffect(() => {
    console.log(tomas)
  }, [tomas])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0', // Reemplaza con tu API Key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  const importar_tomas = async () => {
    try {
      let response = await axiosClient.post("contratos/precontrato", { tomas: tomas })

      toast({
        title: "¡Éxito!",
        description: "Las tomas se importaron con éxito",
        variant: "success",
      })
      set_tomas([]);
      setExcelData([]);
      console.log(response.data.tomas);
      setTomas( (prev) => {
        if (response && response.data && response.data.tomas) {
          return [
            ...prev,
            ...response.data.tomas
          ];
        } else {
          return prev;
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className={"max-w-[96%] max-h-[90vh] h-[90vh] overflow-auto"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Importar Tomas</AlertDialogTitle>
            <AlertDialogDescription>Agrega tomas</AlertDialogDescription>
          </AlertDialogHeader>
          <div className='h-[65vh] max-h-[65vh] grid grid-cols-1 gap-2'>
            <div>
              <div className='flex gap-2'>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                  <Input id="picture" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                </div>
                <Button variant={"outline"} onClick={() => { set_ver_mapa(!ver_mapa) }}>
                  Ocultar / Mostrar Mapa
                </Button>
                {
                  tomas.length > 0 &&
                  <Modal
                    trigger={<Button>
                      Aceptar (importar tomas)
                    </Button>}
                    title='¿Importar Tomas?'
                    description='Se van a importar todas las tomas extraidas del Layout'
                    onConfirm={() => {
                      importar_tomas();
                    }}
                  />
                }


              </div>

              {excelData.length > 0 && !ver_mapa && (
                <div className='overflow-auto h-[55vh]'>
                  <Table>
                    <TableHeader className="bg-muted">
                      <TableRow>
                        {excelData[0].map((header, index) => (
                          <TableHead className="h-1 py-2" key={index}>{header}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {excelData.slice(1).map((row, rowIndex) => (
                        <TableRow key={rowIndex} className="py-0">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

            </div>

            <div>
              {
                tomas.length > 0 && ver_mapa &&
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={12}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {/* Agregar los marcadores al mapa */}
                  {tomas.map((toma) => (
                    <Marker key={toma.id} position={toma.position} label={toma.clave_catastral} map={map} />
                  ))}
                </GoogleMap>

              }

            </div>

          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalImportarTomas;

