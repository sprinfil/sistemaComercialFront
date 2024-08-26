import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Loader from '../../components/ui/Loader';
import PuntoVentaForm from '../../components/Forms/PuntoVentaForm';


export default function PuntoVenta() {

    return(
        <div className=''>
            <PuntoVentaForm/>
        </div>
    );
}
