app.post('/registro', async (req, res) => {
    try {
      // Lógica para registrar un nuevo usuario en la base de datos
      const newUser = req.body;
      await db.promise().query('INSERT INTO usuarios SET ?', [newUser]);
      
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
      const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [usuario, clave]);
  
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
      await db.promise().query('INSERT INTO usuarios SET ?', [newUser]);
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