import express from 'express';
import passport from 'passport';
import UserService from '../services/UserService.js';

const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

// Ruta de logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Ruta para obtener el usuario actual (segura, con DTO)
router.get('/current', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    try {
        // Usamos el DTO para evitar exponer información sensible
        const userDTO = await UserService.getUserDTO(req.user._id);
        res.json(userDTO);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información del usuario', error });
    }
});

export default router;
