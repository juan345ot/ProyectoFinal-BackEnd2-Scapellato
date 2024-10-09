import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export default router;
