import axiosClient from "../axios-client";

const descuentoService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/descuentos-catalogos");
            return response.data;
        } catch (error) {
            throw error?.response?.data.data;
        }
    },

    create_descueto: async (data, archivos) => {
        let formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }

        archivos.forEach((file, index) => {
            formData.append(`evidencia[${index}]`, file);
        });

        try {
            const response = await axiosClient.post("/descuentos-asociado/store", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data?.message;
        }
    },


    getDescuentosPorModelo: async (modelo, modelo_id) => {
        try {
   
            const response = await axiosClient.get("/descuentos-asociado/", {
                params: {
                    modelo_dueno: modelo,
                    id_modelo: modelo_id
                }
            });
            return response.data;
        } catch (error) {
            throw error?.response?.data.data;
        }
    },

}

export default descuentoService;