import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Galery } from "./schemas";
import { GaleryService } from "./galery.service";
import { GaleryController } from "./galery.controller";

@Module({
    imports: [SequelizeModule.forFeature([Galery])],
    providers: [GaleryService],
    controllers: [GaleryController],
})

export class GaleryModule {}