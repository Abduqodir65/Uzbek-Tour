import { Injectable } from "@nestjs/common";
import { City } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCityRequest } from "./interface";
import * as fs from 'fs/promises'
import * as path from "path";

@Injectable()
export class CityService {
    constructor(@InjectModel(City) private cityModel: typeof City) { }

    async getAllCities(): Promise<City[]> {
        return await this.cityModel.findAll();
    }

    async getSingleCity(id: number): Promise<City> {
        return await this.cityModel.findOne({
            where: { id }
        })
    }

}
