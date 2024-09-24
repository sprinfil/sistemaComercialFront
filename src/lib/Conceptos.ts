import axiosClient from "../axios-client";

const ConceptosService = {

    get_all: async () => {
        try {
            const response = await axiosClient.get("/Concepto");
            return response.data;
        } catch (error) {
            throw error?.response?.data.data;
        }
    },

}

export default ConceptosService;