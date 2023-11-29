import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

const verifyToken = (req, res, next) => {
   const token = req.cookies.token;

   if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
   }

   try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
   } catch (error) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
   }
};

export default verifyToken;
