"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUploadMutation } from "../services/UploadVideo";
import { useProcessMutation } from "../services/ProcessVideo";
import { useTranscribeMutation } from "../services/Transcribe";
import { Button } from "@/components/ui/button"; 
import { Progress } from "@/components/ui/progress"; 

const VideoUpload = () => {
    const [file, setFile] = useState("");
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [transcript, setTranscript] = useState("");
    const uploadMutation = useUploadMutation();
    const processMutation = useProcessMutation();
    const transcribeMutation = useTranscribeMutation();

    const handleFilechange = (event) => {
        setFile(event.target.files[0]);

    };

    const handleFileUpload = async () => {

        if (!file){
            setMessage('Please select a video file first');
            return;
        }
        setProgress(10);
        try{
            const uploadResponse = await uploadMutation.mutateAsync(file);
            setProgress(30);
            setMessage('Successfully uploaded file');
            
            const processResponse = await processMutation.mutateAsync(uploadResponse.file)
            setMessage(`Processing complete! Audio: ${processResponse.audio_path}`);
            setProgress(50);

            setMessage("Generating Transcript ...");
            setProgress(70);

            const transcription = await transcribeMutation.mutateAsync(processResponse.audio_path);
            
            setTranscript(transcription.transcript);
            setProgress(100);
            setMessage("successfully transcribed video!");
        }
        catch(error){
            
            setMessage("An error occured, please try again later");
        }
    };


    return (
        <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{ opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className="p-6 border rounded-lg bg-gray-800 text-white"
        >
            <h2></h2>
            <input type="file" accept="video/*" onChange={handleFilechange}  className="mb-2"/>
            <Button onClick={handleFileUpload}>
                { uploadMutation.isPending == 'Pending' || processMutation.isPending == 'Pending' ? 
                    "Processing ..." : 
                    "Upload Video"
                }
            </Button>
            { transcript && (
                <div>
                    <h1>Trancript!</h1>
                    <p>{transcript}</p>
                </div>
            )}
            { progress && (<Progress value={progress} className="mt-2"/>)}
            {message && (<p className="mt-2 text-sm text-green-400">{message}</p>)}
        </motion.div>
    )
};

export default VideoUpload