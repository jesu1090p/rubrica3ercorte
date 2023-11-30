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

  // Consulta todas las ventas
  app.get('/sales', async (req, res) => {
    try {
      const ventas = await promisePool.query('SELECT * FROM ventas');
      
      if (ventas.length === 0) {
        return res.json({ message: 'No hay ventas disponibles en la base de datos.' });
      }
  
      res.json(ventas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las ventas.' });
    }
  });



// Consulta un producto por código
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await promisePool.query('SELECT * FROM productos WHERE id = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
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
  
      if (!user) {
        // Credenciales incorrectas
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
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
  
   
    localStorage.removeItem('jwt');
  
    res.json({ message: 'Logout exitoso' });
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
  console.log(`Servidor escuchando en el puerto ${port}`);
});
  