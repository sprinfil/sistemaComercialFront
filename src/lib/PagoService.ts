import axiosClient from "../axios-client";

const pagoService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/pagos");
            console.log(response.data)
            return response.data;
        } catch (e) {
            throw e?.response?.data;
        }
    },

    //pagos timbrados
    get_pagos_cfdi: async () => {
        try{
            const response = await axiosClient.get("/cfdi");
            return response.data.data
        }
        catch(e){
            throw e?.reponse?.data;
        }
    },

    create_cfdi: async (data : any) => {
        try{
            const response = await axiosClient.post("/cfdi/create", data);
            return response.data
        }
        catch (e){
            throw e?.response?.data;
        }
    }
}

export default pagoService;