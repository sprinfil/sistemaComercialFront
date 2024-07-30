import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Loader from '../../components/ui/Loader'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PuntoVentaForm = () => {
    const [userInput, setUserInput] = useState('');
    const [userData, setUserData] = useState(null);
    const [cargosData, setCargosData] = useState(null);
    const [pagosData, setPagosData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Maneja cambios en el input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    // Función para obtener los datos del usuario
    const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
            const userResponse = await axiosClient.get(`/Toma/codigo/${userInput}`);
            const cargosResponse = await axiosClient.get(`/Toma/cargos/${userInput}`);
            const pagosResponse = await axiosClient.get(`/Toma/pagos/${userInput}`);
            
            console.log('Datos recibidos:', userResponse.data, cargosResponse.data, pagosResponse.data);

            if (userResponse.data) {
                setUserData(userResponse.data);
            } else {
                setError('No se encontraron datos para el usuario.');
            }

            if (cargosResponse.data) {
                setCargosData(cargosResponse.data);
            }

            if (pagosResponse.data) {
                setPagosData(pagosResponse.data);
            }

        } catch (error) {
            console.error("Failed to fetch data:", error);
            setError('Error al buscar usuario.');
        } finally {
            setLoading(false);
        }
    };

    // Maneja el clic en el botón de búsqueda
    const handleSearch = () => {
        if (userInput.trim() !== '') {
            fetchUserData();
        }
    };

    return (
        <div className='justify-center '>
            <div className='bg-muted h-10  justify-center flex items-center rounded-sm'>
                <p className="whitespace-nowrap">Número de toma o clave de usuario</p>
                <Input 
                    className='h-8 ml-1 mr-1 w-96' 
                    value={userInput} 
                    onChange={handleInputChange} 
                />
                <Button 
                    className='h-8 ml-1 mr-1' 
                    onClick={handleSearch}
                >
                    Buscar
                </Button>
            </div>
            {loading && <Loader />}
            {error && <p>{error}</p>}
            {userData && (
                <div className="mt-2 ">
                    <Tabs defaultValue="Informacion">
                        <TabsList>
                            <TabsTrigger value="Informacion">General</TabsTrigger>
                            <TabsTrigger value="cargos">Cargos</TabsTrigger>
                            <TabsTrigger value="pagos">Pagos</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="Informacion">
                            <p className='text-sm'>ID Usuario: {userData.id_usuario}</p>
                            <p className='text-sm'>ID Giro Comercial: {userData.id_giro_comercial}</p>
                            <p className='text-sm'>ID Libro: {userData.id_libro}</p>
                            <p className='text-sm'>ID Código Toma: {userData.id_codigo_toma}</p>
                            <p className='text-sm'>Clave Catastral: {userData.clave_catastral}</p>
                            <p className='text-sm'>Estatus: {userData.estatus}</p>
                            <p className='text-sm'>Calle: {userData.calle}</p>
                            <p className='text-sm'>Entre Calle 1: {userData.entre_calle_1}</p>
                            <p className='text-sm'>Entre Calle 2: {userData.entre_calle_2}</p>
                            <p className='text-sm'>Colonia: {userData.colonia}</p>
                            <p className='text-sm'>Código Postal: {userData.codigo_postal}</p>
                            <p className='text-sm'>Localidad: {userData.localidad}</p>
                            <p className='text-sm'>Diámetro Toma: {userData.diametro_toma}</p>
                            <p className='text-sm'>Calle Notificaciones: {userData.calle_notificaciones}</p>
                            <p className='text-sm'>Entre Calle Notificaciones 1: {userData.entre_calle_notificaciones_1}</p>
                            <p className='text-sm'>Entre Calle Notificaciones 2: {userData.entre_calle_notificaciones_2}</p>
                            <p className='text-sm'>Tipo Servicio: {userData.tipo_servicio}</p>
                            <p className='text-sm'>Tipo Toma: {userData.tipo_toma}</p>
                            <p className='text-sm'>Tipo Contratación: {userData.tipo_contratacion}</p>
                            <p className='text-sm'>C Agua: {userData.c_agua}</p>
                            <p className='text-sm'>C Alc San: {userData.c_alc_san}</p>
                        </TabsContent>

                        {cargosData && (
                            <TabsContent value="cargos">
                                {/* Mostrar datos de cargos aquí */}
                            </TabsContent>
                        )}

                        {pagosData && (
                            <TabsContent value="pagos">
                                {/* Mostrar datos de pagos aquí */}
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
            )}
        </div>
    );
}

export default PuntoVentaForm;
