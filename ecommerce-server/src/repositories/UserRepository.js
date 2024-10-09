import User from '../models/User.js';

class UserRepository {
    static async getById(userId) {
        return await User.findById(userId);
    }

    static async create(userData) {
        return await User.create(userData);
    }

    static async update(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    static async delete(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

export default UserRepository;
