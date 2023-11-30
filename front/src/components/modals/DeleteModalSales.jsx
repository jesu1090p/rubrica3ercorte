import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ deletingSale, handleConfirmDelete, handleCancelDelete }) => {
  return (
    <Modal show={!!deletingSale} onHide={handleCancelDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`¿Estás seguro de que deseas eliminar la venta ${deletingSale?.nombre}?`}</p>
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
  deletingSale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    codigo_producto: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }),
  handleConfirmDelete: PropTypes.func.isRequired,
  handleCancelDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
