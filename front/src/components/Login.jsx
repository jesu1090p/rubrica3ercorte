import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la página
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      // Redirigir al usuario según su rol
      navigate('/dashboard'); // Cambia '/dashboard' por la ruta adecuada
    }
  }, [navigate]);

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
        toast.error(`Usuario o clave incorrectos!`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
          pauseOnHover: false,
          progress: false
        });
        return;
      }

      // Obtener el rol del usuario desde la respuesta del servidor
      const { rol, token } = await response.json();

      // Almacenar el token en el almacenamiento local
      localStorage.setItem('jwt', token);

      toast.success(`Inicio de sesión exitoso!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        pauseOnHover: false,
        progress: undefined
      });

       // Redirigir según el rol del usuario
       setTimeout(() => {
        // Redirigir según el rol del usuario
        if (rol === 'admin') {
          navigate('/products');
        } else if (rol === 'solicitante') {
          navigate('/sales');
        } else {
          // Manejar otros roles o casos según sea necesario
          console.error('Rol no reconocido:', rol);
        }
      }, 1000);

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <h2 className="text-center mb-4">Login</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Usuario:</Form.Label>
            <Form.Control type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
          </Form.Group>

          <Button variant="primary" onClick={handleLogin}>
            Iniciar sesión
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
