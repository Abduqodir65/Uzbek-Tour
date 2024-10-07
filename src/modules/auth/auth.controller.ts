import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse, RefreshResponse, RegisterResponse } from './interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dtos';
import { RefreshDto } from './dtos/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    #_service: AuthService;

    constructor(service: AuthService) {
        this.#_service = service;
    }

    @ApiOperation({ summary: 'Login qilish' })
    @Post('/login')
    async signIn(@Body() payload: LoginDto): Promise<LoginResponse> {
        return await this.#_service.login(payload);
    }

    @Post('/register')
    async signUp(@Body() payload: RegisterDto): Promise<RegisterResponse> {
        return await this.#_service.register(payload);
    }

    @Post('/refresh')
    async refresh(@Body() payload: RefreshDto): Promise<RefreshResponse> {
        return await this.#_service.refresh(payload);
    }
}