/* eslint-disable react/prop-types */
import { Modal, Form, Button } from 'react-bootstrap';

const AddProductModal = ({ show, handleClose, nuevoProducto, handleNuevoProductoChange, agregarProducto }) => {
   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Agregar Producto</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Ingrese el nombre del producto"
                     name="nombre"
                     value={nuevoProducto.nombre}
                     onChange={handleNuevoProductoChange}
                  />
               </Form.Group>

               <Form.Group controlId="formDescripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Ingrese la descripción del producto"
                     name="descripcion"
                     value={nuevoProducto.descripcion}
                     onChange={handleNuevoProductoChange}
                  />
               </Form.Group>

               <Form.Group controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Ingrese el precio del producto"
                     name="precio"
                     value={nuevoProducto.precio}
                     onChange={handleNuevoProductoChange}
                  />
               </Form.Group>

               <Form.Group controlId="formCantidad">
                  <Form.Label>Cantidad en Stock</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Ingrese la cantidad en stock del producto"
                     name="cantidad_en_stock"
                     value={nuevoProducto.cantidad_en_stock}
                     onChange={handleNuevoProductoChange}
                  />
               </Form.Group>

               <Button variant="primary" type="button" onClick={agregarProducto}>
                  Agregar Producto
               </Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
};

export default AddProductModal;
