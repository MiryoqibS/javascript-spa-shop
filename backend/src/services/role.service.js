import { ApiError } from "../errors/ApiError.js";
import { RoleModel } from "../models/Role.model.js";

class RoleService {
    // == создание роли ==
    async createRole(role) {
        const candidate = await RoleModel.findOne({ role });
        if (candidate) throw ApiError.BaqRequestError("такая роль уже существует");

        const newRole = await RoleModel.create({
            role,
        }).then(r => r.toObject());

        return newRole;
    }

    // == получение роли по имени ==
    async getUser(roleName) {
        const role = await RoleModel.findOne({ role: roleName })
            .then(role => role.toObject());

        return role._id;
    }
};

export const roleService = new RoleService();