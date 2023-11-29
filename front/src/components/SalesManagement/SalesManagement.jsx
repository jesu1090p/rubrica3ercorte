import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import SalesTable from './SalesTable';
import SalesModalAgregar from './SalesModalAgregar';
import SalesModalActualizar from './SalesModalActualizar';
import SalesModalEliminar from './SalesModalEiminar';
import {toast} from 'sonner'

const SalesManagement = () => {
   const [ventas, setVentas] = useState([]);
   const [nuevaVenta, setNuevaVenta] = useState({
      codigo_producto: 1,
      nombre: '',
      telefono: '',
      fecha: '',
      cantidad: 0,
   });

   const [showAgregarModal, setShowAgregarModal] = useState(false);
   const [showActualizarModal, setShowActualizarModal] = useState(false);
   const [showEliminarModal, setShowEliminarModal] = useState(false);
   const [ventaAEditar, setVentaAEditar] = useState(null);
   const [ventaAEliminar, setVentaAEliminar] = useState(null);

   useEffect(() => {
      axios.get('http://localhost:5000/sales')
         .then(response => {
            setVentas(response.data);
         })
         .catch(error => {
            console.error('Error al obtener ventas:', error);
         });
   }, []);

   const handleShowAgregarModal = () => setShowAgregarModal(true);
   const handleCloseAgregarModal = () => setShowAgregarModal(false);

   const handleShowActualizarModal = (venta) => {
      setVentaAEditar(venta);
      setShowActualizarModal(true);
   };

   const handleCloseActualizarModal = () => {
      setVentaAEditar(null);
      setShowActualizarModal(false);
   };

   const handleShowEliminarModal = (venta) => {
      setVentaAEliminar(venta);
      setShowEliminarModal(true);
   };

   const handleCloseEliminarModal = () => {
      setVentaAEliminar(null);
      setShowEliminarModal(false);
   };

   const handleNuevaVentaChange = (e) => {
      const { name, value } = e.target;
      setNuevaVenta({
         ...nuevaVenta,
         [name]: value,
      });
   };

   const handleEditarVentaChange = (e) => {
      const { name, value } = e.target;
      setVentaAEditar({
         ...ventaAEditar,
         [name]: value,
      });
   };
 
   const agregarVenta = async () => {
      try {
         if (nuevaVenta.nombre === '' || nuevaVenta.fecha === '') {
             toast.warning('No pueden existir campos vacíos');
             return;
        } else if (nuevaVenta.cantidad<= 0) {
            toast.warning('Verifique la cantidad vendida');
            return;
         } else if (nuevaVenta.telefono.length !== 10) {
            toast.warning('Ingrese un número de teléfono de 10 dígitos');
            return;
         }

         // Verificar la existencia del código de producto
        const productoExistente = await axios.get(`http://localhost:5000/products/${nuevaVenta.codigo_producto}`);
      
        if (!productoExistente.data) {
         // El código de producto no existe, mostrar alerta y salir de la función
         toast.warning('Producto no existe, por favor agr&eacute;guelo al listado de productos.');
         return;
      }
   
         const response = await axios.post('http://localhost:5000/sales', nuevaVenta);
      if (response.data.error) {
         alert(response.data.error);
      } else {

         setVentas(ventasAnteriores => [...ventasAnteriores, response.data]);

         setNuevaVenta({});
         handleCloseAgregarModal();
         toast.success('Registro guardado con éxito');
      }
   } catch (error) {
      console.error('Error al agregar venta:', error);
   }
};

   const actualizarVenta = async () => {
      if (ventaAEditar) {
         try {
            await axios.patch(`http://localhost:5000/sales/${ventaAEditar.codigo}`, ventaAEditar);
            const ventasActualizadas = ventas.map(venta => {
               if (venta.codigo === ventaAEditar.codigo) {
                  return ventaAEditar;
               }
               return venta;
            });
            setVentas(ventasActualizadas);
            handleCloseActualizarModal();
            toast.success('Registro actualizado exitosamente');
         } catch (error) {
            console.error('Error al actualizar venta:', error);
            toast.error('Error al actualizar registro');
         }
      }
   };

   const eliminarVenta = async () => {
      if (ventaAEliminar) {
         try {
            await axios.delete(`http://localhost:5000/sales/${ventaAEliminar.codigo}`);
            const ventasActualizados = ventas.filter(venta => venta.codigo !== ventaAEliminar.codigo);
            setVentas(ventasActualizados);
            toast.error('Registro eliminado con exito');
            handleCloseEliminarModal();
         } catch (error) {
            console.error('Error al eliminar venta:', error);
            toast.error('Error al eliminar venta');
         }
      }
   };

   return (
      <div className='container text-center bg-body-tertiary'>
         <h2 className='mt-5 lead'>Gestión de Ventas</h2>

         <Button className='mb-3' variant="primary" onClick={handleShowAgregarModal}>
            Nueva Venta
         </Button>

         <SalesTable
            ventas={ventas}
            handleShowActualizarModal={handleShowActualizarModal}
            handleShowEliminarModal={handleShowEliminarModal}
         />

         <SalesModalAgregar
            showAgregarModal={showAgregarModal}
            handleCloseAgregarModal={handleCloseAgregarModal}
            nuevaVenta={nuevaVenta}
            handleNuevaVentaChange={handleNuevaVentaChange}
            agregarVenta={agregarVenta}
         />

         <SalesModalActualizar
            showActualizarModal={showActualizarModal}
            handleCloseActualizarModal={handleCloseActualizarModal}
            ventaAEditar={ventaAEditar}
            handleEditarVentaChange={handleEditarVentaChange}
            actualizarVenta={actualizarVenta}
         />

         <SalesModalEliminar
            showEliminarModal={showEliminarModal}
            handleCloseEliminarModal={handleCloseEliminarModal}
            eliminarVenta={eliminarVenta}
         />
      </div>
   );
};

export default SalesManagement;
