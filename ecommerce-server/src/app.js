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

// Configurar conexión a MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((error) => {
        console.error('Error conectando a la base de datos', error);
    });

// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET, // Usar una clave separada para las sesiones
    resave: false,
    saveUninitialized: false,
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

// Registrar el helper "range" en Handlebars
Handlebars.registerHelper('range', function(n, options) {
    let accum = '';
    for (let i = 1; i <= n; ++i) {
        accum += '<li>Elemento número ' + i + '</li>';
    }
    return accum;
});

// Registrar el helper "gt" en Handlebars
Handlebars.registerHelper('gt', function(a, b, options) {
    if (typeof options.inverse !== 'function') {
        options.inverse = () => '';  // Asegurar que haya una función vacía para el bloque "else"
    }

    if (a > b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
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

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
