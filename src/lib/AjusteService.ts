import axiosClient from "../axios-client";

const ajusteService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/Ajuste");
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },

}

export default ajusteService;