import { queryAsync } from '../misc/db.js';
const salesController = {};

salesController.getAllSales = async (req, res) => {
  try {
    const [rows] = await queryAsync('SELECT * FROM ventas');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar ventas' });
  }
};

salesController.getSaleByCode = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const [rows] = await queryAsync('SELECT * FROM ventas WHERE codigo = ?', [codigo]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la venta' });
  }
};

salesController.createSale = async (req, res) => {
  const nuevaVenta = req.body;
  try {
    const result = await queryAsync('INSERT INTO ventas SET ?', nuevaVenta);
    res.status(201).json({ message: 'Venta creada con éxito', codigo: result.insertId });
  } catch (error) {
   res.status(500).json({ error: 'Error interno del servidor' });
  }
};

salesController.updateSale = async (req, res) => {
  const codigo = req.params.codigo;
  const datosActualizados = req.body;
  try {
    await db.queryAsync('UPDATE ventas SET ? WHERE codigo = ?', [datosActualizados, codigo]);
    res.status(200).json({ message: 'Venta actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la venta' });
  }
};

salesController.deleteSale = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    await db.queryAsync('DELETE FROM ventas WHERE codigo = ?', [codigo]);
    res.status(200).json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
   res.status(500).json({ error: 'Error al eliminar la venta' });
  }
};

export default salesController;
