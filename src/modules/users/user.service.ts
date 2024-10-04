import { Injectable } from "@nestjs/common";
import { User } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserRequest, UpdateUserRequest } from "./interfaces";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.findAll();
    }

    async getUserById(id: number): Promise<User> {
        return await this.userModel.findOne({
            where: { id },
        });
    }

    async updateUser(id: number, payload: UpdateUserRequest): Promise<{ message: string; updatedUser: User }> {
        await this.userModel.update(payload, {
            where: { id },
        });
        const updatedUser = await this.userModel.findOne({ where: { id } });
        return { message: 'User updated successfully', updatedUser };
    }

}
