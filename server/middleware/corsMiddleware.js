import cors from 'cors';

const corsMiddleware = cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});

export default corsMiddleware;
