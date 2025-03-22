import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = 'http://localhost:8000/api'
export const useTranscribeMutation = () =>{
    return useMutation({
        mutationFn: async (audioFile) => {
            // Ensure paths use forward slashes (`/`) before sending
            const fixed_audio_file = audioFile.replace(/\\/g, "/");
            const response = await axios.post(`${BASE_URL}/transcribe/?file=${fixed_audio_file}`)
           
            return response.data

        }
    });

};