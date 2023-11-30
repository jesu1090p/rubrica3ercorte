import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const EditModal = ({ editingProduct, setEditingProduct, handleSaveEdit, handleCancelEdit }) => {
  return (
    <Modal show={!!editingProduct} onHide={handleCancelEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
                type="text"
                value={editingProduct?.nombre || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })}
                />
          </Form.Group>

          <Form.Group controlId="formProductDescription">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                value={editingProduct ? editingProduct.descripcion || '' : ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
            />
            </Form.Group>

            <Form.Group controlId="formProductPrice">
                <Form.Label>Precio:</Form.Label>
                <Form.Control
                    type="number"
                    value={editingProduct && typeof editingProduct === 'object' ? editingProduct.precio || 0 : 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, precio: parseFloat(e.target.value) || 0 })}
                />
                </Form.Group>


                <Form.Group controlId="formProductQuantity">
                    <Form.Label>Cantidad:</Form.Label>
                    <Form.Control
                        type="number"
                        value={editingProduct && typeof editingProduct === 'object' ? editingProduct.cantidad || 0 : 0}
                        onChange={(e) => setEditingProduct({ ...editingProduct, cantidad: parseInt(e.target.value) || 0 })}
                    />
                    </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleSaveEdit(editingProduct)}>
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
  editingProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
  }),
  setEditingProduct: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
};

export default EditModal;
