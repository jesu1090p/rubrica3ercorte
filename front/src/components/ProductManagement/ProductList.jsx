import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuth } from '../../modules/AuthContext';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const ProductList = ({ handleShowActualizarModal, handleShowEliminarModal }) => {
   const { estaAutenticado } = useAuth();
   const [productos, setProductos] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Function to fetch products from the server
      const fetchProductos = async () => {
         try {
            // Get the token from cookies
            const token = Cookies.get('token');

            // Make a request to the protected endpoint with the Authorization header
            const response = await fetch('http://localhost:5000/products', {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (response.ok) {
               // If the request is successful, parse the response JSON
               const productosData = await response.json();
               setProductos(productosData);
            } else {
               // Handle errors if the request is not successful
               console.error('Error al obtener los productos:', response.statusText);
            }
         } catch (error) {
            console.error('Error al obtener los productos:', error);
         } finally {
            // Set loading to false once the products are fetched (successful or not)
            setLoading(false);
         }
      };

      // Call the function to fetch products when the component mounts
      fetchProductos();
   }, []); 

   // Check if productos is an object before mapping
   if (!(typeof productos === 'object' && productos !== null)) {
      console.error('productos is not an object:', productos);
      return null; // or handle the error in a way appropriate for your application
   }

   return (
      // Render the component once productos is fetched
      !loading && (
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Cantidad en Stock</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>
               {Object.keys(productos).map(key => (
                  <tr key={key}>
                     <td className='text-center'>{productos[key].codigo}</td>
                     <td>{productos[key].nombre}</td>
                     <td>{productos[key].descripcion}</td>
                     <td>${productos[key].precio}</td>
                     <td className='text-center'>{productos[key].cantidad_en_stock}</td>
                     <td>
                        <Button className={`mx-2 ${estaAutenticado ? '' : 'muted'}`} variant="info" onClick={() => handleShowActualizarModal(productos[key])}>
                           Actualizar
                        </Button>
                        <Button className={`mx-2 ${estaAutenticado ? '' : 'muted'}`} variant="danger" onClick={() => handleShowEliminarModal(productos[key])}>
                           Eliminar
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      )
   );
};

ProductList.propTypes = {
   handleShowActualizarModal: PropTypes.func.isRequired,
   handleShowEliminarModal: PropTypes.func.isRequired,
};

export default ProductList;