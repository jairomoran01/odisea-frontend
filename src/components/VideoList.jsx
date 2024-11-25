import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate(); // Usamos useNavigate para redirigir

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/videos?q=${search}`, { withCredentials: true }); // Agrega withCredentials
                setVideos(response.data);
            } catch (error) {
                // Si hay un error 401 (no autorizado), redirige al login.  Esto maneja el caso en que la sesión ha expirado.
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else {
                    console.error('Error fetching videos:', error);
                }
            }
        };

        fetchVideos();
    }, [search, navigate]);

    return (
        <div>
            <h2>Mis Videos</h2>
            <button onClick={() => navigate('/uploadVideo')}>Subir Nuevo Video</button>
            <input
                type="text"
                placeholder="Buscar videos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleLogout}>Cerrar Sesión</button> {/* Botón de logout */}
            <ul>
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <li key={video._id}>
                            <h3>{video.title}</h3>
                            <video width="320" controls>
                                <source src={video.url} type="video/mp4" />
                            </video>
                        </li>
                    ))
                ) : (
                    <li>No se encontraron videos</li>
                )}
            </ul>
        </div>
    );
};

export default VideoList;
