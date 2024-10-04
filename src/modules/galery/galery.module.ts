import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Galery } from "./schemas";
import { GaleryService } from "./galery.service";
import { GaleryController } from "./galery.controller";
import { FileModule } from "../file";

@Module({
    imports: [SequelizeModule.forFeature([Galery]), FileModule],
    providers: [GaleryService],
    controllers: [GaleryController],
})

export class GaleryModule {}