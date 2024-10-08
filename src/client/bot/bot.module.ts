import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { City, CityModule, CityService } from "modules";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports: [SequelizeModule.forFeature([City]),CityModule],
    providers: [BotService]
})
export class BotModule { }