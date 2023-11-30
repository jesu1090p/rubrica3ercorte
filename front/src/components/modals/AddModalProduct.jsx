import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const AddModal = ({ showAddModal, setShowAddModal, newProduct, setNewProduct, handleSaveNewProduct }) => {
  return (
    <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={newProduct.nombre}
              onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formProductDescription">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newProduct.descripcion}
              onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formProductPrice">
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.precio}
              onChange={(e) => setNewProduct({ ...newProduct, precio: parseFloat(e.target.value) || 0 })}
            />
          </Form.Group>

          <Form.Group controlId="formProductQuantity">
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.cantidad}
              onChange={(e) => setNewProduct({ ...newProduct, cantidad: parseInt(e.target.value) || 0 })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveNewProduct}>
          Agregar Producto
        </Button>
        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddModal.propTypes = {
  showAddModal: PropTypes.bool.isRequired,
  setShowAddModal: PropTypes.func.isRequired,
  newProduct: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  setNewProduct: PropTypes.func.isRequired,
  handleSaveNewProduct: PropTypes.func.isRequired,
};

export default AddModal;
