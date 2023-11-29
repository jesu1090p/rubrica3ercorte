/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';

const SalesModalEliminar = ({ showEliminarModal, handleCloseEliminarModal, eliminarVenta }) => {
   return (
    <Modal show={showEliminarModal} onHide={handleCloseEliminarModal}>
    <Modal.Header closeButton>
       <Modal.Title>Eliminar Venta</Modal.Title>
    </Modal.Header>
    <Modal.Body>
       <p>¿Está seguro de que desea eliminar esta venta?</p>
       <Button variant="danger" type="button" onClick={eliminarVenta}>
          Eliminar Venta
       </Button>
    </Modal.Body>
 </Modal>
   );
};

export default SalesModalEliminar;
