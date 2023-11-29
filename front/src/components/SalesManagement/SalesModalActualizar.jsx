/* eslint-disable react/prop-types */
import { Modal, Form, Button } from 'react-bootstrap';

const SalesModalActualizar = ({
   showActualizarModal,
   handleCloseActualizarModal,
   ventaAEditar,
   handleEditarVentaChange,
   actualizarVenta,
}) => {
   return (
    <Modal show={showActualizarModal} onHide={handleCloseActualizarModal}>
    <Modal.Header closeButton>
       <Modal.Title>Actualizar Venta</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
          <Form.Group controlId="formNombre">
             <Form.Label>Nombre</Form.Label>
             <Form.Control
                type="text"
                placeholder="Ingrese el nombre del cliente"
                name="nombre"
                value={ventaAEditar?.nombre || ''}
                onChange={handleEditarVentaChange}
             />
          </Form.Group>

          <Form.Group controlId="formTelefono">
             <Form.Label>Telefono</Form.Label>
             <Form.Control
                type="number"
                placeholder="Ingrese el telefono del cliente"
                name="telefono"
                value={ventaAEditar?.telefono || 0}
                onChange={handleEditarVentaChange}
             />
          </Form.Group>

          <Form.Group controlId="formFecha">
             <Form.Label>Fecha</Form.Label>
             <Form.Control
                type="date"
                placeholder="Ingrese el precio del venta"
                name="precio"
                value={ventaAEditar?.fecha || ""}
                onChange={handleEditarVentaChange}
             />
          </Form.Group>

          <Form.Group controlId="formCantidad">
             <Form.Label>Cantidad vendida</Form.Label>
             <Form.Control
                type="number"
                placeholder="Ingrese la cantidad vendida"
                name="cantidad"
                value={ventaAEditar?.cantidad || 0}
                onChange={handleEditarVentaChange}
             />
          </Form.Group>

          <Button variant="primary" type="button" onClick={actualizarVenta}>
             Actualizar Venta
          </Button>
       </Form>
    </Modal.Body>
 </Modal>
   );
};

export default SalesModalActualizar;
