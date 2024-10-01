import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schemas";

@Controller('users')
export class UserController {
    #_service: UserService;

    constructor(service: UserService){
        this.#_service = service
    }
    
    @Get()
    async getAllUsers() :Promise<User[]> {
        return await this.#_service.getAllUsers();
    }
}