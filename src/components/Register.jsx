import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate(); // Para la navegación a otras rutas

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
                name,
            });
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            navigate('/login'); // Redirigimos al usuario al login después de un registro exitoso
        } catch (error) {
            console.error('Error registering:', error);
            alert('Error al registrar. Por favor intenta de nuevo.');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Registrarse</button>
            </form>
            <div>
                <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
        </div>
    );
};

export default Register;
