import { useState, useEffect } from 'react';
import axios from 'axios';
import AddModal from './modals/AddModal';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import { Button, Table} from 'react-bootstrap'
import { toast } from 'react-toastify';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
  });

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const productsFromServer = response.data;

      if (Array.isArray(productsFromServer) && productsFromServer.length > 0) {
        setProducts(productsFromServer);
      } else {
       
        setProducts([]);
        console.log('La respuesta del servidor no contiene productos o está vacía.');
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };
  const isAuthenticated = () => {
    // Verifica si existe un token en las cookies
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');
    return !!token;
  };

  const handleAddProduct = () => {
    // Verifica si el usuario está autenticado antes de mostrar el modal
    if (isAuthenticated()) {
      setShowAddModal(true);
    } else {
      toast.error('Debes iniciar sesión como "Admin" para realizar esta acción.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
  };

  const handleEditProduct = (product) => {
    // Verifica si el usuario está autenticado antes de permitir la edición
    if (isAuthenticated()) {
      setEditingProduct(product);
    } else {
      toast.error('Debes iniciar sesión para como "Admin" realizar esta acción.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
  };

  const handleDeleteProduct = (product) => {
    // Verifica si el usuario está autenticado antes de permitir la eliminación
    if (isAuthenticated()) {
      setDeletingProduct(product);
    } else {
      toast.error('Debes iniciar sesión como "Admin" para realizar esta acción.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
  };

  //Crear producto

  const handleSaveNewProduct = async () => {
    if (!newProduct.nombre || !newProduct.descripcion) {
      toast.error("No pueden existir campos vacios.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        pauseOnHover: false,
      });
      return;
    }

    if (newProduct.precio <= 0 || newProduct.cantidad <= 0) {
      toast.error("Asegúrate de que el precio y la cantidad sean mayores que 0.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        pauseOnHover: false,
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/products', newProduct);
      const productoAgregado = response.data;

      setProducts([...products, productoAgregado]);
      setNewProduct({
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0,
      });

      setShowAddModal(false); 
      fetchProducts();
      toast.success("Producto guardado con exito!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
        pauseOnHover: false
      });
    } catch (error) {
      console.error('Error al agregar un nuevo producto:', error);
    }
  };

//Editar producto

  const handleSaveEdit = async (editedProduct) => {
    if (!editedProduct.nombre || !editedProduct.descripcion) {
      toast.error("No pueden existir campos vacios.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        pauseOnHover: false,
      });
      return;
    }

    if (editedProduct.precio <= 0 || editedProduct.cantidad <= 0) {
      toast.error("Asegúrate de que el precio y la cantidad sean mayores que 0.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        pauseOnHover: false,
      });
      return;
    }
    try {
      await axios.patch(`http://localhost:3000/products/${editedProduct.id}`, editedProduct);
      setEditingProduct(null);

            const productosActualizados = products.map((producto) =>
        producto.id === editedProduct.id ? editedProduct : producto
      );
      toast.warning('Producto actualizado con exito!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        pauseOnHover: false,
      })
      setProducts(productosActualizados);
    } catch (error) {
      console.error(`Error al editar el producto con ID ${editedProduct.id}:`, error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${deletingProduct.id}`);
      setDeletingProduct(null);
      
      const productosActualizados = products.filter((producto) => producto.id !== deletingProduct.id);
           
      setProducts(productosActualizados);
      toast.error(`Producto eliminado de la base de datos!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false
      });
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${deletingProduct.id}:`, error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingProduct(null);
  };

  return (    
      <div className='text-center'>
        <h2 className='my-5'>Listado de Productos</h2>
        <Button variant={isAuthenticated() ? "primary" : "secondary"} className={`py-2 my-3 ${isAuthenticated() ? "" : "disabled"}`} onClick={handleAddProduct}>Agregar Producto</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className='align-middle' key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>${product.precio}</td>
                <td>{product.cantidad}</td>
                <td>                   
                    <Button className={`mx-2 ${isAuthenticated() ? "" : "disabled"}`} variant={isAuthenticated() ? "primary" : "secondary"} onClick={() => handleEditProduct(product)}>
                    Editar
                  </Button>
                  <Button  className="mx-2" variant={isAuthenticated() ? "danger" : "secondary"} onClick={() => handleDeleteProduct(product)}>
                    Eliminar
                  </Button>                   
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
               
          <AddModal
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleSaveNewProduct={handleSaveNewProduct}
          />
          <EditModal
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
          />
          <DeleteModal
            deletingProduct={deletingProduct}
            handleConfirmDelete={handleConfirmDelete}
            handleCancelDelete={handleCancelDelete}
          />
        </div>     
  );
};

export default Product;
