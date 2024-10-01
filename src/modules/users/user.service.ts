import { Injectable } from "@nestjs/common";
import { User } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.findAll();
    }

}