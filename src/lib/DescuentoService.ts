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

    create_descueto: async (data) => {
        let formData = new FormData();
        for (let key in data) {
            console.log(key);
            formData.append(key, data[key]);
        }

        // Mostrar el contenido de formData
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        try {
            const response = await axiosClient.post("/descuentos-asociado/store", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data.data;
        }
    },

}

export default descuentoService;