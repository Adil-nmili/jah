import { api } from "@/utils/api";

export const homePageApi = {
    getHomePage: () => {
        return api.get('/api/home');
    },
    getSlider: () => {
        return api.get('/api/accueil/slider');
    },
   
};