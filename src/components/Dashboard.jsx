import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/logout`, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/videos/all?q=${search}`, { withCredentials: true });
        setVideos(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching videos:', error);
        }
      }
    };

    fetchVideos();
  }, [search, navigate]);

  const filteredVideos = videos.filter((video) => {
    return video.title.toLowerCase().includes(search.toLowerCase());
  });
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Todos los Videos</h2>
          <div className="flex justify-between items-center mb-6">
            <div>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-2"
              />
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <li key={video._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div className="w-full flex items-center justify-center p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">{video.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div>
                    <video width="100%" controls className="rounded-b-lg">
                      <source src={video.url} type="video/mp4" />
                    </video>
                  </div>
                </li>
              ))
            ) : (
              <li className="col-span-full text-center text-gray-500">No se encontraron videos</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;