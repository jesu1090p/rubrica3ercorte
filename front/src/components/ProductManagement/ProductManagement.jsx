import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import DeleteProductModal from './DeleteProductModal';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

const ProductManagement = () => {
   const [productos, setProductos] = useState([]);
   const [nuevoProducto, setNuevoProducto] = useState({
      nombre: '',
      descripcion: '',
      precio: 0,
      cantidad_en_stock: 0,
   });

   const [showAgregarModal, setShowAgregarModal] = useState(false);
   const [showActualizarModal, setShowActualizarModal] = useState(false);
   const [showEliminarModal, setShowEliminarModal] = useState(false);
   const [productoAEditar, setProductoAEditar] = useState(null);
   const [productoAEliminar, setProductoAEliminar] = useState(null);

   useEffect(() => {
      axios.get('http://localhost:5000/products')
         .then(response => {
            setProductos(response.data);
         })
         .catch(error => {
            console.log('Error al obtener productos:', error);
         });
   }, []);

   const handleShowAgregarModal = () => setShowAgregarModal(true);
   const handleCloseAgregarModal = () => setShowAgregarModal(false);

   const handleShowActualizarModal = (producto) => {
      setProductoAEditar(producto);
      setShowActualizarModal(true);
   };

   const handleCloseActualizarModal = () => {
      setProductoAEditar(null);
      setShowActualizarModal(false);
   };

   const handleShowEliminarModal = (producto) => {
      setProductoAEliminar(producto);
      setShowEliminarModal(true);
   };

   const handleCloseEliminarModal = () => {
      setProductoAEliminar(null);
      setShowEliminarModal(false);
   };

   const handleNuevoProductoChange = (e) => {
      const { name, value } = e.target;
      setNuevoProducto({
         ...nuevoProducto,
         [name]: value,
      });
   };

   const handleEditarProductoChange = (e) => {
      const { name, value } = e.target;
      setProductoAEditar({
         ...productoAEditar,
         [name]: value,
      });
   };

   const agregarProducto = async () => {
      try {         
         
         if (nuevoProducto.nombre === '' || nuevoProducto.descripcion === '') {
            toast.warning('No pueden haber campos vacios!')
            return;
         }         
         if (nuevoProducto.cantidad_en_stock <= 0 || nuevoProducto.precio <= 0) {
            toast.warning('Ingrese valores mayores a cero!')
            return;
         }
         
         const response = await fetch('http://localhost:5000/products');
            if (response.ok) {
            const productosData = await response.json();
            console.log('Productos recibidos:', productosData);
            setProductos(productosData);
            } else {
            console.error('Error al obtener los productos:', response.statusText);
            }

         /*const response = await axios.post('http://localhost:5000/products', nuevoProducto);
         setProductos([...productos, response.data]);
         setNuevoProducto({
            nombre: '',
            descripcion: '',
            precio: 0,
            cantidad_en_stock: 0,
         });
         handleCloseAgregarModal();
         toast.success('Producto creado con exito')*/
      } catch (error) {
         console.error('Error al insertar producto:', error);
         toast.warning('Error al insertar producto:')
      }
   };

   const actualizarProducto = async () => {
      if (productoAEditar) {
         try {
            await axios.patch(`http://localhost:5000/products/${productoAEditar.codigo}`, productoAEditar);
            const productosActualizados = productos.map(producto => {
               if (producto.codigo === productoAEditar.codigo) {
                  return productoAEditar;
               }
               return producto;
            });
            setProductos(productosActualizados);
            handleCloseActualizarModal(); 
            toast.success('Producto actualizado exitosamente');
         } catch (error) {
            console.error('Error al actualizar producto:', error);
            toast.error('Error al actualizar producto');
         }
      }
   };
   

   const eliminarProducto = async () => {
      if (productoAEliminar) {
         try {
            await axios.delete(`http://localhost:5000/products/${productoAEliminar.codigo}`);
            const productosActualizados = productos.filter(producto => producto.codigo !== productoAEliminar.codigo);
            setProductos(productosActualizados);
            toast.error('Producto eliminado exitosamente');
            handleCloseEliminarModal();
         } catch (error) {
            console.error('Error al eliminar producto:', error);
         }
      }
   };

   return (
      <div className='container text-center'>
         <h2 className='mt-5 lead'>Gestión de Productos</h2>

         <Button className='mb-3' variant="primary" onClick={handleShowAgregarModal}>
            Agregar Producto
         </Button>

         <ProductList
            productos={productos}
            handleShowActualizarModal={handleShowActualizarModal}
            handleShowEliminarModal={handleShowEliminarModal}
         />

         <AddProductModal
            show={showAgregarModal}
            handleClose={handleCloseAgregarModal}
            nuevoProducto={nuevoProducto}
            handleNuevoProductoChange={handleNuevoProductoChange}
            agregarProducto={agregarProducto}
         />

         <UpdateProductModal
            show={showActualizarModal}
            handleClose={handleCloseActualizarModal}
            productoAEditar={productoAEditar}
            handleEditarProductoChange={handleEditarProductoChange}
            actualizarProducto={actualizarProducto}
         />

         <DeleteProductModal
            show={showEliminarModal}
            handleClose={handleCloseEliminarModal}
            eliminarProducto={eliminarProducto}
         />
         <Toaster richColors position="top-center" duration='2000'/>
      </div>
   );
};

export default ProductManagement;
