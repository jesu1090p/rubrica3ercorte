import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const AddModal = ({ showAddModal, setShowAddModal, newSale, setNewSale, handleSaveNewSale }) => {
  return (
    <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSaleCode">
            <Form.Label>Código Producto:</Form.Label>
            <Form.Control
              type="number"
              value={newSale.codigo_producto}
              onChange={(e) => setNewSale({ ...newSale, codigo_producto: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSaleName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={newSale.nombre}
              onChange={(e) => setNewSale({ ...newSale, nombre: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSalePhone">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="text"
              value={newSale.telefono}
              onChange={(e) => setNewSale({ ...newSale, telefono: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSaleDate">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              value={newSale.fecha}
              onChange={(e) => setNewSale({ ...newSale, fecha: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSaleQuantity">
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              value={newSale.cantidad}
              onChange={(e) => setNewSale({ ...newSale, cantidad: parseInt(e.target.value) || 0 })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveNewSale}>
          Agregar Venta
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
  newSale: PropTypes.shape({
    codigo_producto: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  setNewSale: PropTypes.func.isRequired,
  handleSaveNewSale: PropTypes.func.isRequired,
};

export default AddModal;
