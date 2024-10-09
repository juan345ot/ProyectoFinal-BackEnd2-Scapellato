import UserRepository from '../repositories/UserRepository.js';

class UserService {
    static async getUserDTO(userId) {
        const user = await UserRepository.getById(userId);
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }

    static async updateUser(userId, updateData) {
        return await UserRepository.update(userId, updateData);
    }
}

export default UserService;
