import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import VideoList from './components/VideoList';
import UploadVideo from './components/UploadVideo';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto: Login */}
        <Route path="/" element={<Login />} />
        {/* Ruta por defecto: Login */}
        <Route path="/login" element={<Login />} />
        {/* Ruta para el registro */}
        <Route path="/register" element={<Register />} />
        {/* Ruta para la lista de videos */}
        <Route path="/videoList" element={<VideoList />} />
        {/* Ruta para subir videos */}
        <Route path="/uploadVideo" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
};

export default App;
