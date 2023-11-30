import { useState } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Registro.css'

const Registro = () => {
  const navigate = useNavigate(); // Usar el hook useNavigate directamente aquí

  const [registroData, setRegistroData] = useState({
    nombre: '',
    usuario: '',
    clave: '',
    rol: 'admin', // Valor predeterminado, puedes ajustarlo según tus necesidades
  });

  const handleChange = (e) => {
    setRegistroData({ ...registroData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud al servidor para registrar al usuario
      const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registroData),
      });

      if (!response.ok) {
        // Manejar el caso en que el registro no fue exitoso
        const { error } = await response.json();
        console.error('Error en el registro:', error);
        toast.error('Error en el registro. Por favor, verifica tus datos e intenta de nuevo.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          pauseOnHover: false,
        });
        return;
      }

      // Registro exitoso
      toast.success('Registro exitoso. Redirigiendo al inicio de sesión...', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (error) {
      console.error('Error al realizar la solicitud de registro:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Col md={{ span: 4, offset: 4 }}>
        <h2 className="text-center mb-4">Registro de usuarios</h2>

        <Form onSubmit={handleSubmit} className='bg-primary-subtle border border-primary rounded p-3'>
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={registroData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Usuario:</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={registroData.usuario}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Clave:</Form.Label>
            <Form.Control
              type="password"
              name="clave"
              value={registroData.clave}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol:</Form.Label>
            <Form.Select
              name="rol"
              value={registroData.rol}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="solicitante">Solicitante</option>
            </Form.Select>
          </Form.Group>
            <div className="text-center">

          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        <p className='small mt-3'>Ya tienes una cuenta? <Link to={'/login'}>Inicia sesi&oacute;n</Link></p>
            </div>
        </Form>
      </Col>
    </Container>
  );
};

export default Registro;
