import { api } from '@/utils/api'

export const diplomesApi = {
    getDiplomes: () => {
        return api.get('/diplomes');
    }
}