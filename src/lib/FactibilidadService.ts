import axiosClient from "../axios-client";

const factibilidadService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/factibilidad");
            return response.data.data;
        } catch (error) {
            throw error?.response?.data.data;
        }
    },

}

export default factibilidadService;