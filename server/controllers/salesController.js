import db from '../db.js';

const salesController = {
    
    

    // Consulta todos los productos
    getAllSales: async (req, res) => {
        try {
          const [ventas] = await db.promise().query('SELECT * FROM ventas');
    
          if (ventas.length === 0) {
            return res.json({ message: 'No hay ventas disponibles en la base de datos.' });
          }
    
          res.json(ventas);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener las ventas.' });
        }
      }
    }

export default salesController;