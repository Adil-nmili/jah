import { api } from "@/utils/api";

export const registerEtudiant =  {
     register : (data: any) => {
        return api.post("/api/register", data,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
};

