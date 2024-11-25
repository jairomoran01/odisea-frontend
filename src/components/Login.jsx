import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Para la navegación a otras rutas

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            // Si la autenticación es exitosa, redirigimos al usuario a la lista de videos
            localStorage.setItem('token', response.data.token); // Guardamos el token en el localStorage
            navigate('/videoList'); // Redirigimos a la página de videos
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error al iniciar sesión. Por favor verifica tus credenciales.');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <div>
                <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
            </div>
        </div>
    );
};

export default Login;
