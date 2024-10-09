import express from 'express';
import cartsRouter from './routes/carts.js';
import productsRouter from './routes/products.js';
import sessionsRouter from './routes/sessions.js';
import viewsRouter from './routes/views.js';
import passport from 'passport';
import './config/passport.js';
import { isAdmin } from './middleware/authMiddleware.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/carts', cartsRouter);
app.use('/api/products', isAdmin, productsRouter); // Solo administradores pueden manejar productos
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

// Inicialización de Passport
app.use(passport.initialize());

// Middleware para errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
