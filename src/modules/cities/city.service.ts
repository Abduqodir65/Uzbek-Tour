import { Injectable } from "@nestjs/common";
import { City } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CityService {
    constructor(@InjectModel(City) private cityModel: typeof City) {}

    async getAllCities(): Promise<City[]> {
        return await this.cityModel.findAll();
    }

    async getSingleCity(id: number): Promise<City> {
        return await this.cityModel.findOne({
            where:{id}
        })
    }

    
}