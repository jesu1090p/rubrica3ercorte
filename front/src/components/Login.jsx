import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Realizar la solicitud al servidor para autenticar al usuario
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, clave }),
      });

      if (!response.ok) {
        // Manejar el caso en que la autenticación no fue exitosa
        const { error } = await response.json();
        console.error('Error en la autenticación:', error);
        return;
      }

      // Obtener el rol del usuario desde la respuesta del servidor
      const { rol } = await response.json();

      // Redirigir según el rol del usuario
      if (rol === 'admin') {
        navigate('/products');
      } else if (rol === 'solicitante') {
        navigate('/sales');
      } else {
        // Manejar otros roles o casos según sea necesario
        console.error('Rol no reconocido:', rol);
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Usuario:
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
