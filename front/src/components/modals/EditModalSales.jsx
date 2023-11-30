import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const EditModal = ({ editingSale, setEditingSale, handleSaveEdit, handleCancelEdit }) => {
  return (
    <Modal show={!!editingSale} onHide={handleCancelEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSaleCode">
            <Form.Label>Código Producto:</Form.Label>
            <Form.Control
              type="text"
              value={editingSale?.codigo_producto || ''}
              onChange={(e) => setEditingSale({ ...editingSale, codigo_producto: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSaleName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={editingSale?.nombre || ''}
              onChange={(e) => setEditingSale({ ...editingSale, nombre: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSalePhone">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="text"
              value={editingSale?.telefono || ''}
              onChange={(e) => setEditingSale({ ...editingSale, telefono: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSaleDate">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="text"
              value={editingSale?.fecha || ''}
              onChange={(e) => setEditingSale({ ...editingSale, fecha: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formSaleQuantity">
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              value={editingSale?.cantidad || 0}
              onChange={(e) => setEditingSale({ ...editingSale, cantidad: parseInt(e.target.value) || 0 })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleSaveEdit(editingSale)}>
          Guardar Cambios
        </Button>
        <Button variant="secondary" onClick={handleCancelEdit}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditModal.propTypes = {
  editingSale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    codigo_producto: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }),
  setEditingSale: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
};

export default EditModal;
