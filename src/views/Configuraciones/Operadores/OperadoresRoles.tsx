import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';
import Loader from '../../../components/ui/Loader';
import { Switch } from "@/components/ui/switch"
import IconButton from '../../../components/ui/IconButton';
import { CheckCircledIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useStateContext } from '../../../contexts/ContextOperador';

export const OperadoresRoles = () => {

    const [Loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const { editando, setEditando, setOperadores, tab } = useStateContext();
    const [editar, setEditar] = useState(false);
    const { operador } = useStateContext();
    const [switch_values, setSwitch_values] = useState({});


    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        sync_roles();
    }, [operador]);

    useEffect(() => {
        if (!editar) {
            sync_roles();
        }
    }, [switch_values]);

    useEffect(() => {
        
    }, [tab]);





    const _editar = () => {
        setEditar(!editar);
        setEditando(!editando);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (operador) {
            setLoading(true);
            const formData = new FormData(e.target);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log(data);
            axiosClient.post(`Rol/assign_rol_to_user/${operador.user.id}`, data)
                .then((response) => {
                    console.log(response);
                    getOperadores();
                    setLoading(false);
                }).catch((response) => {
                    //console.log(response);
                    setLoading(false);
                })

            setEditar(!editar);
            setEditando(!editando);

        } else {
            alert("selecciona un operador")
        }
    };


    function sync_roles() {
        let roles_names = [];
        let switch_values_temp = []
        roles.map((rol, index) => {
            roles_names[index] = rol.name;
        })
        if (operador.user != null) {
            let operador_roles = operador.user.roles;
            let operador_roles_names = [];
            operador_roles.map((rol, index) => {
                operador_roles_names[index] = rol.name;
            })

            roles_names.map((rol, index) => {
                if (operador_roles_names.includes(rol)) {
                    switch_values_temp[rol] = true;
                } else {
                    switch_values_temp[rol] = false;
                }
            })
            setSwitch_values(switch_values_temp);
            //getOperadores();
        }
    }

    const getOperadores = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/Operador");
            setLoading(false);
            setOperadores(response.data);
            //console.log(response.data);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch Operadores:", error);
        }
    };

    useEffect(() => {
        if (operador.user) {
            sync_roles();
        }
    }, [roles])

    const getRoles = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/Rol");
            setLoading(false);
            setRoles(response.data.data);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch anomalias:", error);
        }
    };

    const handleSwitchChange = (roleName, checked) => {
        setSwitch_values({
            ...switch_values,
            [roleName]: checked,
        });
    };


    return (
        <div>
            <form action="" onSubmit={handleFormSubmit}>
                <div className='w-full h-[40px] bg-muted mb-[20px] rounded-md sticky top-0 z-10 flex items-center'>
                    <div className='absolute left-3 flex gap-2'>
                        <p>Configuración</p>
                    </div>
                    <div className='absolute right-3 flex gap-2'>

                        {
                            editar &&
                            <>
                                <button type='submit'>
                                    <div>
                                        <IconButton>
                                            <CheckCircledIcon className='text-green-500' />
                                        </IconButton>
                                    </div>
                                </button>
                            </>

                        }
                        {
                            !editar &&
                            <div onClick={_editar}>
                                <IconButton>
                                    <Pencil1Icon />
                                </IconButton>
                            </div>
                        }
                    </div>
                </div>
                {
                    Loading &&
                    <Loader />
                }
                {
                    !Loading &&
                    roles.map((rol, index) => (
                        <div className='w-full h-[20px] mb-[10px] p-5 flex items-center rounded-md border border-border relative'>
                            {rol.name}
                            <div className='absolute right-5'>
                                <Switch
                                    disabled={!editar}
                                    checked={switch_values[rol.name]}
                                    onCheckedChange={
                                        (checked) => {
                                            let input = document.getElementById(rol.name);
                                            if (input) {
                                                input.value = checked ? "true" : "false";
                                                //console.log(checked);
                                                handleSwitchChange(rol.name, checked)
                                            }
                                        }
                                    }
                                />
                                <input type="text" hidden id={rol.name} name={rol.name} value={switch_values[rol.name]} />
                            </div>
                        </div>
                    ))}
            </form>
        </div>
    )
}