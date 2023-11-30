import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ deletingProduct, handleConfirmDelete, handleCancelDelete }) => {
  return (
    <Modal show={!!deletingProduct} onHide={handleCancelDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`¿Estás seguro de que deseas eliminar el producto ${deletingProduct?.nombre}?`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Eliminar
        </Button>
        <Button variant="secondary" onClick={handleCancelDelete}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteModal.propTypes = {
  deletingProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
  }),
  handleConfirmDelete: PropTypes.func.isRequired,
  handleCancelDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
