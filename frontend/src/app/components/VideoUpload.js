"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUploadMutation } from "../services/UploadVideo";
import { useProcessMutation } from "../services/ProcessVideo";
import { Button } from "@/components/ui/button"; // Updated import
import { Progress } from "@/components/ui/progress"; // Updated import
import dynamic from "next/dynamic";

const VideoUpload = () => {
    const [file, setFile] = useState("");
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const uploadMutation = useUploadMutation();
    const processMutation = useProcessMutation();

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
            setProgress(50);
            setMessage('Successfully uploaded file');
            console.log(uploadResponse.file)
            const processResponse = await processMutation.mutateAsync(uploadResponse.file)
            setMessage(`Processing complete! Audio: ${processResponse.audio_path}`);
            setProgress(100);
            setMessage("successfully processed file");
        }
        catch(error){
            console.log(error)
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
            { progress && (<Progress value={progress} className="mt-2"/>)}
            {message && (<p className="mt-2 text-sm text-green-400">{message}</p>)}
        </motion.div>
    )
};

export default VideoUpload