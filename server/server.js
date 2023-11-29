import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/salesRoutes.js';
import expressListEndpoints from 'express-list-endpoints';

const app = express();


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);
app.get('/', function(req, res) {
   res.send({
      text: 'API de manejo de productos y ventas'
   });
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Error interno del servidor');
});
console.log(expressListEndpoints(app));
const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Servidor iniciado en el puerto ${PORT}`);
});