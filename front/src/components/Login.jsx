import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       , setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Paso 1: Autenticar al usuario
      const autenticacionResponse = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      if (!autenticacionResponse.ok) {
        // Manejar el caso en que la autenticación no fue exitosa
        console.error('Error en la autenticación:', autenticacionResponse.statusText);
        return;
      }

      // Paso 2: Obtener el rol del usuario autenticado
      const rolResponse = await fetch('http://localhost:3000/obtener-rol', {
        method: 'GET',
        headers: {
          // Asegúrate de enviar cualquier token de autenticación que pueda ser necesario
          'Authorization': `Bearer ${token}`, // Ejemplo, ajusta según tu implementación
        },
      });

      if (!rolResponse.ok) {
        // Manejar el caso en que no se pudo obtener el rol
        console.error('Error al obtener el rol:', rolResponse.statusText);
        return;
      }

      const { rol } = await rolResponse.json();

      // Redirección basada en el rol
      if (rol === 'admin') {
        navigate('/products');
      } else if (rol === 'solicitante') {
        navigate('/sales');
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
        <input type="password" value={clave} onChange={(e) =>                                                                                 (e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
