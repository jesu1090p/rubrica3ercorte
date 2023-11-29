/* eslint-disable react/prop-types */
import { Modal, Form, Button } from 'react-bootstrap';

const SalesModalAgregar = ({
   showAgregarModal,
   handleCloseAgregarModal,
   nuevaVenta,
   handleNuevaVentaChange,
   agregarVenta,
}) => {
   return (
    <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
    <Modal.Header closeButton>
       <Modal.Title>Agregar Venta</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
       <Form.Group controlId="formIdProducto">
       <Form.Label>Codigo del producto</Form.Label>
       <Form.Control
          type="number"
          placeholder="Ingrese el codigo del producto"
          name="codigo_producto"
          value={nuevaVenta.codigo_producto}
          onChange={handleNuevaVentaChange}
       />
       </Form.Group>

       <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
             type="text"
             placeholder="Ingrese el nombre del cliente"
             name="nombre"
             value={nuevaVenta.nombre}
             onChange={handleNuevaVentaChange}
          />
       </Form.Group>

       <Form.Group controlId="formTelefono">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
             type="text"
             placeholder="Ingrese el telefono del cliente"
             name="telefono"
             value={nuevaVenta.telefono}
             onChange={handleNuevaVentaChange}
          />
       </Form.Group>

       <Form.Group controlId="formFecha">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
             type="date"
             placeholder="Ingrese la fecha de venta"
             name="fecha"
             value={nuevaVenta.fecha}
             onChange={handleNuevaVentaChange}
          />
       </Form.Group>

       <Form.Group controlId="formCantidad">
          <Form.Label>Cantidad vendida</Form.Label>
          <Form.Control
             type="number"
             placeholder="Ingrese la cantidad vendida"
             name="cantidad"
             value={nuevaVenta.cantidad}
             onChange={handleNuevaVentaChange}
          />
       </Form.Group>

       <Button className='mt-3' variant="primary" type="button" onClick={agregarVenta}>
          Agregar Venta
       </Button>
    </Form>
    </Modal.Body>
 </Modal>
   );
};

export default SalesModalAgregar;
