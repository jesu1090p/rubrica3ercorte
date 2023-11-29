import jwt from 'jsonwebtoken';

const secretKey = 'tuClaveSecreta'; // Cambia esto por una clave secreta segura

export function generateToken(usuario) {
  const token = jwt.sign({ usuario }, secretKey, { expiresIn: '1h' });
  return token;
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw error;
  }
}
