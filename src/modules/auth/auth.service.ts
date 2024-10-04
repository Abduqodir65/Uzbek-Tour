import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../users";
import { LoginRequest, LoginResponse } from "./interfaces";
import { InjectModel } from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private readonly usermodel:typeof User, private config:ConfigService, private jwt:JwtService ) { }

    async login(payload:LoginRequest):Promise<LoginResponse> { 
        const foundedUser = this.usermodel.findOne({where: {email: payload.email, phone:payload.phone}})

        if(!foundedUser){
            throw new NotFoundException('User Not Found')
        }

        const accessToken = await this.jwt.signAsync({
            id: foundedUser.id,
            role: foundedUser.role,
        },
        {
            expiresIn: this.config.get<number>("jwt.accessTime"),
            secret: this.config.get<string>("jwt.accessKey")
        })

        const refreshToken = await this.jwt.signAsync({
            id: foundedUser.id,
            role: foundedUser.role,
        },
        {
            expiresIn: this.config.get<number>("jwt.refreshTime"),
            secret: this.config.get<string>("jwt.refreshKey")
        })

        return {
            message: 'logged in',
            accessToken,
            refreshToken
        }

    }

    async register() { }

    async logout() { }

    async refresh() { }

}