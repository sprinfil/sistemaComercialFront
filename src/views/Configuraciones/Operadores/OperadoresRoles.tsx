import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';
import Loader from '../../../components/ui/Loader';
import { Switch } from "@/components/ui/switch"

export const OperadoresRoles = () => {

    const [Loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/Rol");
            setLoading(false);
            setRoles(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch anomalias:", error);
        }
    };


    return (

        <div>
            {
                Loading &&
                <Loader />
            }
            {roles.map((rol, index) => (
                <div className='w-full h-[20px] mb-[10px] p-5 flex items-center rounded-md border border-border relative'>
                    {rol.name}
                    <div className='absolute right-5'>
                        <Switch />
                    </div>
                </div>
            ))}
        </div>
    )
}
