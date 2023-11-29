import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors'


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

app.get('/', (req, res) => {
    res.json({message: 'API de manejo de productos y ventas'});
})

function generateToken(usuario) {
    const token = jwt.sign({ usuario }, 'tuClaveSecreta', { expiresIn: '1h' });
    return token;
  }

// Rutas
// Consulta todos los productos
app.get('/products', async (req, res) => {
  try {
    const [productos] = await db.promise.query('SELECT * FROM productos');

    if (productos.length === 0) {
      return res.json({ message: 'No hay productos disponibles en la base de datos.' });
    }

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});


  
  // Consulta todas las ventas
  app.get('/sales', async (req, res) => {
    try {
      const ventas = await db.query('SELECT * FROM ventas');
      
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
    const producto = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

// Crea un nuevo producto
app.post('/products', async (req, res) => {
  const nuevoProducto = req.body;
  try {
    await db.query('INSERT INTO productos SET ?', [nuevoProducto]);
    res.json({ mensaje: 'Producto creado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
});

// Actualiza un producto por código
app.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
  const productosActualizados = req.body;
  try {
    await db.query('UPDATE productos SET ? WHERE id = ?', [productosActualizados, id]);
    res.json({ mensaje: 'Producto actualizado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

// Elimina un producto por código
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto.', error });
  }
});


// Rutas para Ventas

// Resto de rutas para Ventas (similar a las de Productos)



app.post('/registro', async (req, res) => {
    try {
      // Lógica para registrar un nuevo usuario en la base de datos
      const newUser = req.body;
      await db.promise.query('INSERT INTO usuarios SET ?', [newUser]);
      
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
    app.post('/registro', async (req, res) => {
    try {
      // Extraer los datos del cuerpo de la solicitud
      const { usuario, contraseña, rol } = req.body;
  
      // Validar si el usuario ya existe en la base de datos
      const existingUser = await getUserByUsername(usuario);
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe.' });
      }
  
      // Si el usuario no existe, registrarlo en la base de datos
      const newUser = { usuario, contraseña, rol };
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

  // Función para obtener un usuario por credenciales desde la base de datos
  async function getUserByCredentials(usuario, clave, rol) {
    try {
      // Realizar la consulta a la base de datos
      const [rows] = await db.promise.query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [usuario, clave]);
  
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

  async function createUser(newUser) {
    try {
      await db.promise.query('INSERT INTO usuarios SET ?', [newUser]);
    } catch (error) {
      throw error;
    }
  }
// Manejo de errores de conexión a la base de datos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error de conexión a la base de datos.' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});