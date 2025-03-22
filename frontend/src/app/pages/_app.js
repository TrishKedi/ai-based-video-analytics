import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoUpload from "../components/VideoUpload";
// import Transcription from "../components/Transcription";
// import Summarization from "../components/Summarization";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoUpload />} />
       
      </Routes>
    </Router>
  );
}
