import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { City } from "./schemas";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";
import { FileModule } from "modules/file";

@Module({
    imports: [SequelizeModule.forFeature([City]),FileModule],
    providers: [CityService],
    controllers: [CityController],
})

export class CityModule {}