import axiosClient from "../axios-client";

const TipoTomasService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/TipoToma");
            return response.data.data;
        } catch (error) {
            throw error?.response?.data.data;
        }
    },

}

export default TipoTomasService;