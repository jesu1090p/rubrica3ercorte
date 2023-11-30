import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');

  const decodeToken = (token) => {
    try {
      const decoded = atob(token.split('.')[1]);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la página
    const storedToken = Cookies.get('jwt');
    if (storedToken) {
      // Si hay un token, el usuario está autenticado
      setIsAuthenticated(true);

      // Puedes decodificar el token para obtener información adicional
      // en este ejemplo, asumiré que el token contiene el nombre del usuario
      // Esto puede variar según cómo estés manejando la autenticación
      const decodedToken = decodeToken(storedToken);
      if (decodedToken && decodedToken.usuario) {
        setName(decodedToken.usuario);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setName('');
        Cookies.remove('jwt');
        navigate('/');
        
      } else {
        console.error('Error en la solicitud de logout');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de logout:', error);
    }
  };

  return (
    <Navbar bg="light" variant="light" style={{ fontFamily: 'Sora' }} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          GestionARTE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!isAuthenticated && (
              <>
                <Button className="mx-2" variant="outline-success" as={Link} to="/login">
                  Iniciar sesi&oacute;n
                </Button>
                <Button variant='outline-info' as={Link} to="/register">
                  Registrarme
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link>Hola, {name}!</Nav.Link>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
                
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
