import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = 'http://localhost:8000/api'
export const useProcessMutation = () => {
    return useMutation({
        mutationFn: async (video_file_name) => {
            const response = await axios.post(`${BASE_URL}/process?filename=${video_file_name}`)
            return response.data
    
        }
    });
}
