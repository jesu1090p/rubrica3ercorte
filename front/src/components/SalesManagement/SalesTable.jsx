
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SalesTable = ({ ventas, handleShowActualizarModal, handleShowEliminarModal }) => {
   // Ensure ventas is an array or set it to an empty array
   const ventasArray = Array.isArray(ventas) ? ventas : [];
   
   return (
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>Código del producto</th>
               <th>Nombre del cliente</th>
               <th>Teléfono</th>
               <th>Fecha</th>
               <th>Cantidad</th>
               <th>Acciones</th>
            </tr>
         </thead>
         <tbody>
            {ventasArray.map(venta => (
               <tr key={venta.codigo}>
                  <td className='text-center'>{venta.codigo_producto}</td>
                  <td>{venta.nombre}</td>
                  <td>{venta.telefono}</td>
                  <td>{venta.fecha}</td>
                  <td className='text-center'>{venta.cantidad}</td>
                  <td>
                     <Button className="mx-2" variant="info" onClick={() => handleShowActualizarModal(venta)}>
                        Actualizar
                     </Button>
                     <Button className="mx-2" variant="danger" onClick={() => handleShowEliminarModal(venta)}>
                        Eliminar
                     </Button>
                  </td>
               </tr>
            ))}
         </tbody>
      </Table>
   );
};

SalesTable.propTypes = {
   ventas: PropTypes.oneOfType([
      PropTypes.arrayOf(
         PropTypes.shape({
            codigo: PropTypes.number.isRequired,
            codigo_producto: PropTypes.number.isRequired,
            nombre: PropTypes.string.isRequired,
            telefono: PropTypes.string.isRequired,
            fecha: PropTypes.string.isRequired,
            cantidad: PropTypes.number.isRequired,
         })
      ),
      PropTypes.object, 
   ]).isRequired,
   handleShowActualizarModal: PropTypes.func.isRequired,
   handleShowEliminarModal: PropTypes.func.isRequired,
};

export default SalesTable;
