import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoList = ({ token }) => {
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate(); // Usamos useNavigate para redirigir

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/videos?q=${search}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, [search, token]);

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
