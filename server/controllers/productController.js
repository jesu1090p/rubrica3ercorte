import { queryAsync } from '../misc/db.js'
const productController = {};

productController.getAllProducts = async (req, res) => {
  try {
    const [rows] = await queryAsync('SELECT * FROM productos');
    console.log('Productos recuperados:', rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar productos' });
  }
};

productController.getProductByCode = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const [rows] = await queryAsync('SELECT * FROM productos WHERE codigo = ?', [codigo]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar el producto' });
  }
};

productController.createProduct = async (req, res) => {
  const nuevoProducto = req.body;
  try {
    const result = await queryAsync('INSERT INTO productos SET ?', nuevoProducto);
    res.status(201).json({ message: 'Producto creado con éxito', codigo: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

productController.updateProduct = async (req, res) => {
  const codigo = req.params.codigo;
  const datosActualizados = req.body;
  try {
    await queryAsync('UPDATE productos SET ? WHERE codigo = ?', [datosActualizados, codigo]);
    res.status(200).json({ message: 'Producto actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

productController.deleteProduct = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    await queryAsync('DELETE FROM productos WHERE codigo = ?', [codigo]);
    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
   res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

export default productController;
