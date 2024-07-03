import User from '../../models/user.model';

class RoleService {
    async getRole(id: string) {
        const response = await User.findOne({ _id: id });
        return response?.role;
    }
}

export default new RoleService();
