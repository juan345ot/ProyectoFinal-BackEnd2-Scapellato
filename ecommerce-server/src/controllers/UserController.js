import UserService from '../services/UserService.js';

class UserController {
    static async getCurrentUser(req, res) {
        try {
            const userDTO = await UserService.getUserDTO(req.user.id);
            res.status(200).json(userDTO);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la información del usuario' });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.user;
        const updateData = req.body;
        try {
            const updatedUser = await UserService.updateUser(id, updateData);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    }
}

export default UserController;
