import { api } from "@/utils/api";

export const homePageApi = {
    getHomePage: () => {
        return api.get('/home');
    },
    
};