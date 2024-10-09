const authMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'No autenticado' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ error: 'No autorizado' });
        }

        next();
    };
};

export const isAdmin = authMiddleware('admin');
export const isUser = authMiddleware('user');
