import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { User } from '../users';
import { LoginRequest, LoginResponse, RefreshRequest, RefreshResponse, RegisterRequest, RegisterResponse } from './interfaces';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private usermodel: typeof User,
        private config: ConfigService,
        private jwt: JwtService,
    ) { }

    async login(payload: LoginRequest): Promise<LoginResponse> {
        const foundedUser = await this.usermodel.findOne({
            where: { email: payload.email, phone: payload.phone },
        });

        if (!foundedUser) {
            throw new NotFoundException('User not found');
        }

        const accessToken = await this.jwt.signAsync(
            {
                id: foundedUser.id,
                role: foundedUser.role,
            },
            {
                expiresIn: this.config.get<number>('jwt.accessTime'),
                secret: this.config.get<string>('jwt.accessKey'),
            },
        );

        const refreshToken = await this.jwt.signAsync(
            {
                id: foundedUser.id,
                role: foundedUser.role,
            },
            {
                expiresIn: this.config.get<string>('jwt.refreshTime'),
                secret: this.config.get<string>('jwt.refreshKey'),
            },
        );

        return {
            message: 'successfully logged in',
            accessToken,
            refreshToken,
        };
    }

    async register(payload: RegisterRequest): Promise<RegisterResponse> {
        const newUser = await this.usermodel.create({ name: payload.name, email: payload.email, phone: payload.phone })

        const accessToken = await this.jwt.signAsync(
            {
                id: newUser.id,
                role: newUser.role,
            },
            {
                expiresIn: this.config.get<number>('jwt.accessTime'),
                secret: this.config.get<string>('jwt.accessKey'),
            },
        );

        const refreshToken = await this.jwt.signAsync(
            {
                id: newUser.id,
                role: newUser.role,
            },
            {
                expiresIn: this.config.get<string>('jwt.refreshTime'),
                secret: this.config.get<string>('jwt.refreshKey'),
            },
        );

        return {
            message: 'successfully registered in',
            accessToken,
            refreshToken,
        };
    }

    async logout() { }

    async refresh(payload: RefreshRequest): Promise<RefreshResponse> {
        try {
            this.jwt.verify(payload.refreshToken, { secret: this.config.get<string>('jwt.refreshKey') })
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnprocessableEntityException("Token already expired")
            }

            if (error instanceof NotBeforeError) {
                throw new ConflictException("Token not before error")
            }

            if (error instanceof JsonWebTokenError) {
                throw new BadRequestException(error.message)
            }

            throw new InternalServerErrorException("Internal error occurred")
        }

        const userDecodedData = this.jwt.decode(payload.refreshToken)

        const accessToken = await this.jwt.signAsync(
            {
                id: userDecodedData?.id,
                role: userDecodedData?.role,
            },
            {
                expiresIn: this.config.get<number>('jwt.accessTime'),
                secret: this.config.get<string>('jwt.accessKey'),
            },
        );

        const refreshToken = await this.jwt.signAsync(
            {
                id: userDecodedData?.id,
                role: userDecodedData?.role,
            },
            {
                expiresIn: this.config.get<string>('jwt.refreshTime'),
                secret: this.config.get<string>('jwt.refreshKey'),
            },
        );

        return {
            message: 'successfully refresh',
            accessToken,
            refreshToken,
        };
    }
}