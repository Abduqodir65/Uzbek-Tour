import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports:[SequelizeModule.forFeature([User])],
    providers:[AuthService],
    controllers: [AuthController]
})

export class AuthModule {}