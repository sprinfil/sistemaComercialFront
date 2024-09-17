import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario.tsx';
import ModalConvenio from '../ui/ModalConvenios.tsx';
import ModalAjustes from '../ui/ModalAjuste.tsx';
import Loader from '../ui/Loader.tsx';

const CargosUsuarioForm = () => {
    const { usuariosEncontrados } = ZustandGeneralUsuario();
    const [cargos, setCargos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedConvenio, setSelectedConvenio] = useState<any | null>(null);

    useEffect(() => {
        
        if (usuariosEncontrados) {
            setLoading(true); // Empieza a cargar
            axiosClient.get(`/Toma/cargos/${usuariosEncontrados[0].tomas[0].codigo_toma}`)
                .then(({ data }) => {
                    const filteredCargos = data.data.map((cargo: any) => ({
                        concepto: cargo.concepto.nombre,
                        monto: cargo.monto,
                        estado: cargo.estado,
                        fechaCargo: cargo.fecha_cargo,
                        prioridad: cargo.concepto.prioridad_abono
                    }));
                    setCargos(filteredCargos);
                })
                .catch(err => {
                    console.error('Error al obtener los cargos:', err);
                })
                .finally(() => {
                    setLoading(false); // Termina de cargar
                });
        }
    }, [usuariosEncontrados]);

    const handleConvenioConfirm = (convenio: any) => {
        setSelectedConvenio(convenio);
        console.log('Convenio seleccionado:', convenio);
    };

    const handleAjustesConfirm = () => {
        // Lógica cuando se confirma en el modal de ajustes
        console.log('Ajustes modal confirmed');
    };

    return (
        <div>
            
            {loading ? (
                <Loader />
            ) : (
                <table className="w-full table-fixed">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Concepto</th>
                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Convenio</th>
                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Ajuste</th>
                        </tr>
                    </thead>
                    <tbody className="bg-background">
                        {cargos.length > 0 ? (
                            cargos.map((cargo, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-3">{cargo.concepto}</td>
                                    <td className="px-2 py-3">{cargo.estado}</td>
                                    <td className="px-2 py-3">ninguno</td>
                                    <td className="px-2 py-3">ninguno</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-2 py-3 text-center">No hay cargos disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            <div className="mb-4 flex justify-end gap-2">
                <ModalConvenio
                    trigger={<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Convenios</button>}
                    title="Convenios"
                    onConfirm={handleConvenioConfirm}
                />
                <ModalAjustes
                    trigger={<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Ajustes</button>}
                    title="Ajustes"
                    onConfirm={handleAjustesConfirm}
                />
            </div>
        </div>
    );
}

export default CargosUsuarioForm;
