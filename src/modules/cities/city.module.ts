import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { City } from "./schemas";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";

@Module({
    imports: [SequelizeModule.forFeature([City])],
    providers: [CityService],
    controllers: [CityController],
})

export class CityModule {}