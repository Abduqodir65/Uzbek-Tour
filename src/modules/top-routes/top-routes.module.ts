import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Routes } from "./schemas";
import { RoutesService } from "./top-routes.service";
import { RoutesController } from "./top-routes.controller";

@Module({
    imports: [SequelizeModule.forFeature([Routes])],
    providers: [RoutesService],
    controllers: [RoutesController],
})

export class RoutesModule {}