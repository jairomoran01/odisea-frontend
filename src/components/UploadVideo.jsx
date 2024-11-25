import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadVideo = ({ token }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // Usamos useNavigate para redirigir

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('video', file);

        try {
            await axios.post('http://localhost:5000/api/videos/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Video subido con éxito.');
            navigate('/videoList'); // Redirigimos a la lista de videos después de subir
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Error al subir el video. Por favor intenta de nuevo.');
        }
    };

    return (
        <div>
            <h2>Subir Video</h2>
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="Título del video"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">Subir Video</button>
            </form>
        </div>
    );
};

export default UploadVideo;
