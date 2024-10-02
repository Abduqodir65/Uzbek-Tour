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

    async createCity(payload: CreateCityRequest): Promise<{ message: string; city: City }> {
        const city = await this.cityModel.create({
            name: payload.name,
            description: payload,
            region: payload.region,
            history: payload.history,
            climate: payload.climate,
            image: payload.image,
            video: payload.video

        });
        return { message: 'City created successfully', city };
    }

    async updateCity(id: number, payload: CreateCityRequest): Promise<{ message: string; city: City }> {
        const city = await this.cityModel.findOne({ where: { id } });
        if (!city) {
            throw new Error('City not found');
        }

        await city.update(payload);
        return { message: 'City updated successfully', city };
    }

    async deleteCity(id: number): Promise<{ message: string }> {
        const city = await this.cityModel.findOne({ where: { id } });
        if (!city) {
            throw new Error('City not found');
        }

        if (city.city_image) {
            const imagePath = path.join(__dirname, '..', 'uploads', city.city_image);
            try {
                fs.unlink(imagePath);
            } catch (err) {
                console.error('Error while deleting image file:', err);
                throw new Error('Failed to delete image file');
            }
        }
        await city.destroy();
        return { message: 'City deleted successfully' };
    }
}
