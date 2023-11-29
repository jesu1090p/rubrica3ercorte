/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';

const DeleteProductModal = ({ show, handleClose, eliminarProducto }) => {
   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Eliminar Producto</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>¿Está seguro de que desea eliminar este producto?</p>
            <Button variant="danger" type="button" onClick={eliminarProducto}>
               Eliminar Producto
            </Button>
         </Modal.Body>
      </Modal>
   );
};

export default DeleteProductModal;
