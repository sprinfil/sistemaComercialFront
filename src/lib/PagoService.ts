import axiosClient from "../axios-client";

const pagoService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/pagos");
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },

}

export default pagoService;