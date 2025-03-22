import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const useUploadMutation = () => {
    
    return useMutation({
        mutationFn: async (videoFile) => {
            const formData = new FormData();
            formData.append("file", videoFile);
            const response = await axios.post(`${BASE_URL}/upload`, formData)
            return response.data
        }
    });

};


