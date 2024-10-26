import UserRepository from '../repositories/UserRepository.js';
import UserDTO from '../dto/UserDTO.js';

class UserService {
    static async getUserDTO(userId) {
        const user = await UserRepository.getById(userId);
        return new UserDTO(user); 
    }

    static async getUserByEmail(email) {
        const user = await UserRepository.getByEmail(email);
        return new UserDTO(user); 
    }

    static async updateUser(userId, updateData) {
        return await UserRepository.update(userId, updateData);
    }
}

export default UserService;
