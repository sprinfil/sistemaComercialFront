import React from 'react';
import axios from 'axios'; // Importamos Axios
import axiosClient from '../../../axios-client';

class PrintButton extends React.Component {
    handlePrint = () => {
        // Realizamos la solicitud POST usando Axios
        axiosClient.post('/print')
            .then(response => {
                if (!response.data) {
                    throw new Error('Empty response data');
                }
                console.log(response.data.message); // Mostramos el mensaje de respuesta
            })
            .catch(error => {
                console.error('Error:', error.message); // Capturamos y mostramos cualquier error
            });
    }

    render() {
        return (
            <button onClick={this.handlePrint}>Imprimir</button> // Botón para invocar handlePrint
        );
    }
}

export default PrintButton;
