import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = Cookies.get('jwt');
    if (storedToken) {
      navigate('/'); 
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

        if (error) {
          toast.error('Usuario o contraseña incorrectos!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            pauseOnHover: false,
          });
        }
        return;
      }

      // Obtener el rol del usuario desde la respuesta del servidor
      const { rol, token } = await response.json();

      // Almacenamos el token en una cookie
      Cookies.set('jwt', token, { expires: 0.25 }); // La cookie expira en 6 horas

      toast.success(`Inicio de sesión exitoso!`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        pauseOnHover: false,
        progress: undefined,
      });

      // Set the state variables
      setIsAuthenticated(true);
      setUserName(usuario);

      // Redirigir según el rol del usuario
      setTimeout(() => {
        if (rol === 'admin') {
          navigate('/products');
        } else if (rol === 'solicitante') {
          navigate('/sales');
        }
      }, 1000);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', // include cookies in the request
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUserName('');

        // Remove the token from localStorage
        localStorage.removeItem('jwt');

        navigate('/login'); // redirect to the login page after logout
      } else {
        console.error('Error in logout request');
      }
    } catch (error) {
      console.error('Error making logout request:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Col md={{ span: 4, offset: 4 }}>
        <h2 className="text-center mb-4">Inicio de sesi&oacute;n</h2>

        <Form className="bg-gradient bg-secondary-subtle border rounded p-3">
          <Form.Group className="mb-3">
            <Form.Label>Usuario:</Form.Label>
            <Form.Control
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" onClick={handleLogin}>
              Iniciar sesión
            </Button>
            <p className="small mt-3">
              No tienes cuenta? <Link to={'/register'}>Reg&iacute;strate</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
