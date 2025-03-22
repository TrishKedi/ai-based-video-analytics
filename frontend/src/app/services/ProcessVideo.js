import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const useProcessMutation = () => {
    return useMutation({
        mutationFn: async (video_file_name) => {
            const response = await axios.post(`${BASE_URL}/process?filename=${video_file_name}`)
            return response.data
    
        }
    });
}
