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
    

    async createUser(payload: CreateUserRequest): Promise<void> {
        await this.userModel.create({
            name: payload.name,
            age: payload.age,
            country: payload.country,
            email: payload.email,
            image: payload.image,
        });
    }

    async updateUser(id: number, payload: UpdateUserRequest): Promise<void> {
        await this.userModel.update(payload, {
            where: { id },
        });
    }

    async deleteUser(id: number): Promise<void> {
        await this.userModel.destroy({
            where: { id },
        });
    }



}