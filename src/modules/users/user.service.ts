import { Injectable } from "@nestjs/common";
import { User } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserRequest, UpdateUserRequest } from "./interfaces";
import * as path from "path";
import * as fs from 'fs'

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

    async createUser(payload: CreateUserRequest): Promise<{ message: string; user: User }> {
        const user = await this.userModel.create({
            name: payload.name,
            age: payload.age,
            country: payload.country,
            email: payload.email,
            image: payload.image,
        });
        return { message: 'User created successfully', user };
    }

    async updateUser(id: number, payload: UpdateUserRequest): Promise<{ message: string; updatedUser: User }> {
        await this.userModel.update(payload, {
            where: { id },
        });
        const updatedUser = await this.userModel.findOne({ where: { id } });
        return { message: 'User updated successfully', updatedUser };
    }

    async deleteUser(id: number): Promise<{message: string}> {
        await this.userModel.destroy({
            where: { id },
        });

        return {message: "User deleted successfuly"}
    }
}
