import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';  // Importar express-handlebars
import Handlebars from 'handlebars';  // Importar Handlebars para los helpers

// Importar rutas
import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';
import sessionRoutes from './routes/sessions.js';
import viewRoutes from './routes/views.js';

// Configurar dotenv para cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar conexión a MongoDB con mejores manejos de eventos
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((error) => {
        console.error('Error conectando a la base de datos', error);
    });

mongoose.connection.on('disconnected', () => {
    console.error('Conexión a MongoDB perdida');
});
mongoose.connection.on('reconnected', () => {
    console.log('Reconexion a MongoDB');
});

// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET, // Usar una clave separada para las sesiones
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Solo usar cookies seguras en producción
        httpOnly: true,  // Evitar acceso a las cookies por scripts del lado del cliente
        maxAge: 1000 * 60 * 60 * 24  // 1 día de expiración para la cookie
    }
}));

// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());
import './config/passport.js'; // Importar configuración de Passport

// Configurar el motor de plantillas Handlebars con acceso a propiedades prototípicas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),  // Directorio de layouts
    defaultLayout: 'index',  // Definir 'index.handlebars' como el layout principal
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Helpers de Handlebars en un archivo separado (por modularidad)
// Registrar el helper "range"
Handlebars.registerHelper('range', function(n, options) {
    let accum = '';
    for (let i = 1; i <= n; ++i) {
        accum += '<li>Elemento número ' + i + '</li>';
    }
    return accum;
});

// Registrar el helper "gt"
Handlebars.registerHelper('gt', function(a, b, options) {
    if (typeof options.inverse !== 'function') {
        options.inverse = () => '';  // Asegurar que haya una función vacía para el bloque "else"
    }

    return a > b ? options.fn(this) : options.inverse(this);
});

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/', viewRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Página no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
