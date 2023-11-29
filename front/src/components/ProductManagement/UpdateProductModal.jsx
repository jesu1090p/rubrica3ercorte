/* eslint-disable react/prop-types */
import { Modal, Form, Button } from 'react-bootstrap';

const UpdateProductModal = ({ show, handleClose, productoAEditar, handleEditarProductoChange, actualizarProducto }) => {
   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Actualizar Producto</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Ingrese el nombre del producto"
                     name="nombre"
                     value={productoAEditar?.nombre || ''}
                     onChange={handleEditarProductoChange}
                  />
               </Form.Group>

               <Form.Group controlId="formDescripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Ingrese la descripción del producto"
                     name="descripcion"
                     value={productoAEditar?.descripcion || ''}
                     onChange={handleEditarProductoChange}
                  />
               </Form.Group>

               <Form.Group controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Ingrese el precio del producto"
                     name="precio"
                     value={productoAEditar?.precio || 0}
                     onChange={handleEditarProductoChange}
                  />
               </Form.Group>

               <Form.Group controlId="formCantidad">
                  <Form.Label>Cantidad en Stock</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Ingrese la cantidad en stock del producto"
                     name="cantidad_en_stock"
                     value={productoAEditar?.cantidad_en_stock || 0}
                     onChange={handleEditarProductoChange}
                  />
               </Form.Group>

               <Button className='mt-3' variant="primary" type="button" onClick={actualizarProducto}>
                  Actualizar Producto
               </Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
};

export default UpdateProductModal;
