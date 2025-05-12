import { api } from '@/utils/api'

export const diplomesApi = {
    getDiplomes: () => {
        return api.get('/api/diplomes');
    },
    getDiplomeById: (id: string) => {
        return api.get(`/api/diplomes/${id}`);
    }
}