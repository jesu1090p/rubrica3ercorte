/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'sonner';

const RegistrationForm = ({ history }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    usuario: '',
    clave: '',
    rol: 'solicitante', 
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    
    setShowModal(true);
  },[]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Almacenar el token y el rol en el almacenamiento local
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        // Redirigir según el rol
        if (data.role === 'admin') {
          history.push('/products');
        } else if (data.role === 'solicitante') {
          history.push('/sales');
        }

       
        setShowModal(false);
      } else {
        toast.warning('Error en el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Regístrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="usuario">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="correp">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
            />
          </div>
          <div className="form-group">
            <label htmlFor="clave">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="clave"
              name="clave"
              value={formData.clave}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rol">Rol</label>
            <select
              className="form-control"
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="solicitante">Solicitante</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Registrarse
          </button>
        </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RegistrationForm;
