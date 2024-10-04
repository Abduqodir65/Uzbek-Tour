import { Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos";

export class AuthController {
    #_service: AuthService;

    constructor(service:AuthService) {
        this.#_service = service
    }

    @Post('/login')
    async signIn(@Body() payload: LoginDto):Promise<>
    
}