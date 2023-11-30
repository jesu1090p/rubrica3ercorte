import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

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
        setUserName(decodedToken.usuario);
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
        setUserName('');
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
    <Navbar bg="light" variant="light" style={{fontFamily:'Sora'}} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          GestionARTE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar sesi&oacute;n
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrarse
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link disabled>{userName}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
