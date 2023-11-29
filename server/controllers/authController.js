// authController.js
import db from '../db.js';
import { generateToken, verifyToken } from '../token.js';

const authController = {
  register: async (req, res) => {
    try {
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
  },

  login: async (req, res) => {
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
  },
};

async function getUserByUsername(usuario) {
  try {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getUserByCredentials(usuario, clave) {
  try {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [usuario, clave]);
    return rows[0];
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

export default authController;
