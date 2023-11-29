import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate instead of history
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = e.target.usuario.value;
    const clave = e.target.clave.value;

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, clave }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User Data:', userData);
        Cookies.set('token', userData.token, { domain: 'localhost', path: '/' });

        const rolResponse = await fetch(`http://localhost:5000/auth/obtenerRol/${usuario}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (rolResponse.ok) {
          const rolData = await rolResponse.json();
          localStorage.setItem('rol', rolData.rol);
          toast.success('Inicio de sesion exitoso');
          if (rolData.rol == 'admin') {
            navigate('/products'); 
          } else if (rolData.rol == 'solicitante') {
            navigate('/sales'); 
          }
        } else {
          setError('Error al obtener el rol del usuario');
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al realizar la solicitud');
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2>Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">Usuario:</label>
              <input type="text" className="form-control" id="usuario" name="usuario" />
            </div>
            <div className="mb-3">
              <label htmlFor="clave" className="form-label">Contraseña:</label>
              <input type="password" className="form-control" id="clave" name="clave" />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
          </form>
          <p className="mt-3">
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Login;
