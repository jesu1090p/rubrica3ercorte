import { useState, useEffect } from 'react';
import axios from 'axios';
import AddModal from './modals/AddModalProduct';
import EditModal from './modals/EditModalProduct';
import DeleteModal from './modals/DeleteModalProduct';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [editingSale, setEditingSale] = useState(null);
  const [deletingSale, setDeletingSale] = useState(null);
  const [newSale, setNewSale] = useState({
    codigo_producto: '',
    nombre: '',
    telefono: '',
    fecha: '',
    cantidad: 0,
  });

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sales');
      const salesFromServer = response.data;

      if (Array.isArray(salesFromServer) && salesFromServer.length > 0) {
        setSales(salesFromServer);
      } else {
        setSales([]);
        console.log('La respuesta del servidor no contiene ventas o está vacía.');
      }
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    }
  };

  const isAuthenticated = () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');
    return !!token;
  };

  const handleAddSale = () => {
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

  const handleEditSale = (sale) => {
    if (isAuthenticated()) {
      setEditingSale(sale);
    } else {
      toast.error('Debes iniciar sesión como "Admin" para realizar esta acción.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
  };

  const handleDeleteSale = (sale) => {
    if (isAuthenticated()) {
      setDeletingSale(sale);
    } else {
      toast.error('Debes iniciar sesión como "Admin" para realizar esta acción.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
  };

  const handleSaveNewSale = async () => {
    if (!newSale.codigo_producto || !newSale.nombre || !newSale.telefono || !newSale.fecha || newSale.cantidad <= 0) {
      toast.error("Asegúrate de completar todos los campos y que la cantidad sea mayor que 0.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/sales', newSale);
      const saleAdded = response.data;

      setSales([...sales, saleAdded]);
      setNewSale({
        codigo_producto: '',
        nombre: '',
        telefono: '',
        fecha: '',
        cantidad: 0,
      });

      setShowAddModal(false);
      fetchSales();
      toast.success("Venta guardada con éxito!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
        pauseOnHover: false,
      });
    } catch (error) {
      console.error('Error al agregar una nueva venta:', error);
    }
  };

  const handleSaveEdit = async (editedSale) => {
    if (!editedSale.codigo_producto || !editedSale.nombre || !editedSale.telefono || !editedSale.fecha || editedSale.cantidad <= 0) {
      toast.error("Asegúrate de completar todos los campos y que la cantidad sea mayor que 0.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/sales/${editedSale.id}`, editedSale);
      setEditingSale(null);

      const updatedSales = sales.map((sale) =>
        sale.id === editedSale.id ? editedSale : sale
      );
      toast.warning('Venta actualizada con éxito!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      })
      setSales(updatedSales);
    } catch (error) {
      console.error(`Error al editar la venta con ID ${editedSale.id}:`, error);
    }
  };

  const handleCancelEdit = () => {
    setEditingSale(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/sales/${deletingSale.id}`);
      setDeletingSale(null);

      const updatedSales = sales.filter((sale) => sale.id !== deletingSale.id);

      setSales(updatedSales);
      toast.error(`Venta eliminada de la base de datos!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false
      });
    } catch (error) {
      console.error(`Error al eliminar la venta con ID ${deletingSale.id}:`, error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingSale(null);
  };

  return (
    <div className='text-center'>
      <h2 className='my-5'>Listado de Ventas</h2>
      <Button variant={isAuthenticated() ? "primary" : "secondary"} className={`py-2 my-3 ${isAuthenticated() ? "" : "disabled"}`} onClick={handleAddSale}>Agregar Venta</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código Producto</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr className='align-middle' key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.codigo_producto}</td>
              <td>{sale.nombre}</td>
              <td>{sale.telefono}</td>
              <td>{sale.fecha}</td>
              <td>{sale.cantidad}</td>
              <td>
                <Button className={`mx-2 ${isAuthenticated() ? "" : "disabled"}`} variant={isAuthenticated() ? "warning" : "secondary"} onClick={() => handleEditSale(sale)}>
                  Editar
                </Button>
                <Button className="mx-2" variant={isAuthenticated() ? "danger" : "secondary"} onClick={() => handleDeleteSale(sale)}>
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
        newSale={newSale}
        setNewSale={setNewSale}
        handleSaveNewSale={handleSaveNewSale}
      />
      <EditModal
        editingSale={editingSale}
        setEditingSale={setEditingSale}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
      />
      <DeleteModal
        deletingSale={deletingSale}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
      />
    </div>
  );
};

export default Sales;
