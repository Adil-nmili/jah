import { api } from '@/utils/api'

export const formationsApi = {
    getFormations: () => {
        return api.get('/api/formations');
    },
    getFormationById: (id: string) => {
        return api.get(`/api/formations/${id}`);
    }
}
