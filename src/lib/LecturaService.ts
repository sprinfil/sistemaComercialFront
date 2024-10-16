import axiosClient from "../axios-client";

const lecturasService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/lectura");
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error?.response?.data;
        }
    },

}

export default lecturasService;