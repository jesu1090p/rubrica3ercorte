import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { promisePool } from './db.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));

app.get('/', (req, res) => {
    res.json({message: 'API de manejo de productos y ventas'});
})

function generateToken(usuario) {
    const token = jwt.sign({ usuario }, 'tuClaveSecreta', { expiresIn: '1h' });
    return token;
  }

  async function getUserByCredentials(usuario, clave) {
    try {
      // Realizar la consulta a la base de datos
      const [rows] = await promisePool.query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [usuario, clave]);
  
      // Si hay un usuario que coincide con las credenciales, devolverlo
      if (rows.length > 0) {
        return rows[0];
      }
  
      // Si no se encuentra un usuario, devolver null
      return null;
    } catch (error) {
      throw error;
    }
  }
  
  async function getUserByUsername(usuario) {
    try {
      // Realizar la consulta a la base de datos
      const [rows] = await promisePool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  
      // Si hay un usuario que coincide con el nombre de usuario, devolverlo
      if (rows.length > 0) {
        return rows[0];
      }
  
      // Si no se encuentra un usuario, devolver null
      return null;
    } catch (error) {
      throw error;
    }
  }
  
  async function createUser(newUser) {
    try {
      await promisePool.query('INSERT INTO usuarios SET ?', [newUser]);
    } catch (error) {
      throw error;
    }
  }
// Rutas
// Consulta todos los productos
app.get('/products', async (req, res) => {
    try {
      const [productos] = await promisePool.query('SELECT * FROM productos');
  
      if (productos.length === 0) {
        return res.json({ message: 'No hay productos disponibles en la base de datos.' });
      }
  
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los productos.' });
    }
  });

  // Crea un nuevo producto
app.post('/products', async (req, res) => {
  const nuevoProducto = req.body;
  try {
    // Insertar el nuevo producto en la base de datos
    await promisePool.query('INSERT INTO productos SET ?', [nuevoProducto]);
    res.json({ mensaje: 'Producto creado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
});


// Consulta un producto por código
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await promisePool.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró ningun producto con el código proporcionado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener producto.' });
  }
});

//Editar producto
app.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
    const updatedProductData = req.body;

    try {
      await promisePool.query('UPDATE productos SET ? WHERE id = ?', [updatedProductData, id]);

      res.json({ message: 'Producto actualizado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
});

// Elimina un producto por código
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await promisePool.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

//Obtener todas las ventas
app.get('/sales', async (req, res) => {
  try {
    const [ventas] = await promisePool.query('SELECT * FROM ventas');

    if (ventas.length === 0) {
      return res.json({ message: 'No hay ventas disponibles en la base de datos.' });
    }

    const formattedVentas = ventas.map((venta) => ({
      ...venta,
      fecha: new Date(venta.fecha).toLocaleDateString('es-CO'), 
    }));

    res.json(formattedVentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ventas.' });
  }
});

// Consulta venta por código
app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await promisePool.query('SELECT * FROM ventas WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró ninguna venta con el código proporcionado.' });
    }

    const formattedVenta = {
      ...rows[0],
      fecha: new Date(rows[0].fecha).toLocaleDateString('es-ES'),
    };

    res.json(formattedVenta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener venta.' });
  }
});

 // Crea unanueva venta
 app.post('/sales', async (req, res) => {
  const nuevaVenta = req.body;

  try {
    // Verificar si el producto con el codigo_producto existe
    const [productRows] = await promisePool.query('SELECT * FROM productos WHERE id = ?', [nuevaVenta.codigo_producto]);

    if (productRows.length === 0) {
      // Si el producto no existe, enviar un mensaje de error al cliente
      return res.status(400).json({ error: 'El producto no existe.' });
    }

    await promisePool.query('INSERT INTO ventas SET ?', [nuevaVenta]);
    res.json({ mensaje: 'Venta creada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar.' });
    res.status(400).json({ error: 'Producto con el condigo ingresado no existe. Un admin debe crearlo' });
  }
});

//Editar producto
app.patch('/sales/:id', async (req, res) => {
  const { id } = req.params;
    const updatedSalesData = req.body;

    try {
      await promisePool.query('UPDATE ventas SET ? WHERE id = ?', [updatedSalesData, id]);

      res.json({ message: 'Venta actualizada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar venta.' });
    }
});

// Elimina venta por código
app.delete('/sales/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await promisePool.query('DELETE FROM ventas WHERE id = ?', [id]);
    res.json({ mensaje: 'Venta eliminada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar venta.' });
  }
});

app.post('/register', async (req, res) => {
    try {
      // Lógica para registrar un nuevo usuario en la base de datos
      const newUser = req.body;
      await promisePool.query('INSERT INTO usuarios SET ?', [newUser]);
      
      // Lógica para autenticar al usuario y generar el token
      const token = generateToken(newUser.usuario);
      
      // Almacena el token en una cookie
      res.cookie('jwt', token, { httpOnly: true });
      
      res.json({ message: 'Usuario registrado exitosamente', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  });
  
  // Rutas para Registro y Autenticación de Usuarios

  app.post('/login', async (req, res) => {
    try {
      // Extraer credenciales del cuerpo de la solicitud
      const { usuario, clave } = req.body;
  
      // Lógica para verificar las credenciales en la base de datos
      const user = await getUserByCredentials(usuario, clave);
  
      // Verificar si la clave es correcta
      if (!user || (user.clave !== clave) || (user.usuario !== usuario)) {
        const errorType = !user ? 'Usuario no encontrado' : 'Contraseña incorrecta';
        return res.status(401).json({ error: errorType });
      }
  
  
      // Usuario autenticado, generar token JWT
      const token = generateToken(usuario);
  
      // Almacenar el token en una cookie
      res.cookie('jwt', token, { httpOnly: true });
  
      // Devolver el rol del usuario en la respuesta
      res.json({ message: 'Usuario autenticado exitosamente', token, rol: user.rol });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al autenticar al usuario.' });
    }
  });

  app.post('/logout', (req, res) => {
   
    res.clearCookie('jwt');  
    res.json({ message: 'Cierre de sesion exitoso' });
  });

  app.post('/registro', async (req, res) => {
    try {
      // Extraer los datos del cuerpo de la solicitud
      const { nombre, usuario, clave, rol } = req.body;
  
      // Validar si el usuario ya existe en la base de datos
      const existingUser = await getUserByUsername(usuario);
      if (existingUser) {
        // El usuario ya está registrado, enviar un toast de advertencia
        return res.status(400).json({ warning: 'El usuario ya está registrado.' });
      }
  
      // Si el usuario no existe, registrarlo en la base de datos
      const newUser = { nombre, usuario, clave, rol };
      await createUser(newUser);
  
      // Generar un token para el nuevo usuario
      const token = generateToken(usuario);
  
      // Almacenar el token en una cookie
      res.cookie('jwt', token, { httpOnly: true });
  
      res.json({ message: 'Usuario registrado exitosamente', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  });


// Manejo de errores de conexión a la base de datos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error de conexión a la base de datos.' });
});

app.listen(port, () => {
  console.log(`Servidor conectado al puerto ${port}`);
});
  