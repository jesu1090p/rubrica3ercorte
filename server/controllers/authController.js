import jwt from 'jsonwebtoken';
import { queryAsync } from '../misc/db.js';

const secretKey = 'your-secret-key';

const generateToken = (user) => {
  const token = jwt.sign(
    {user},
    secretKey,
    { expiresIn: '15m' }
  );
  return token;
};

const login = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const [user] = await queryAsync('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [usuario, clave]);

    console.log('User:', user); 

    if (!user) {
      return res.status(401).json({ message: 'Usuario o clave incorrecta' });
    }

    const token = generateToken(user);

    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Inicio de sesión exitoso', user });
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

const obtenerRol = async (req, res) => {
  const { usuario } = req.params; 

  try {
    
    const userRol = await queryAsync('SELECT rol FROM usuarios WHERE usuario = ?', [usuario]);

    if (userRol && userRol.length > 0) {
      res.json({ rol: userRol[0].rol });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el rol del usuario' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Cierre de sesión exitoso' });
};

const register = async (req, res) => {
  const { nombre, correo, usuario, clave, rol } = req.body;

  try {
    
    const result = await queryAsync('INSERT INTO usuarios (nombre, correo, usuario, clave, rol) VALUES (?, ?, ?, ?, ?)', [nombre, correo, usuario, clave, rol]);
    const tokenRegistro = generateToken(result);

    res.status(201).json({ message: 'Registro exitoso', tokenRegistro, rol });
} catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
};

export { login, logout, register, obtenerRol };
