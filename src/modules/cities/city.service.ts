import { Injectable } from "@nestjs/common";
import { City } from "./schemas"; 
import { InjectModel } from "@nestjs/sequelize";
import { CreateCityRequest,UpdateCityRequest } from "./interfaces";
import { FileService } from "../file";
import { CreateCityDto } from "./dtos";

@Injectable()
export class CityService {
    constructor(@InjectModel(City) private cityModel: typeof City, private readonly fileService: FileService) { }

    async getAllCities(): Promise<City[]> {
        return await this.cityModel.findAll();
    }

    async getCityById(id: number): Promise<City> {
        return await this.cityModel.findOne({
            where: { id },
        });
    }

    async createCity(payload: CreateCityDto, files: { image?: Express.Multer.File; video?: Express.Multer.File }): Promise<{ message: string; new_city: City }> {
        const city_image = files.image ? await this.fileService.uploadFile(files.image) : null;
        const city_video = files.video ? await this.fileService.uploadFile(files.video) : null;

        const new_city = await this.cityModel.create({
            name: payload.name,
            description: payload.description,
            region: payload.region,
            history: payload.history,
            climate: payload.climate,
            city_image,
            city_video,
        });

        return { message: 'City created successfully', new_city };
    }

    async updateCity(id: number, payload: UpdateCityRequest, files?: { image?: Express.Multer.File; video?: Express.Multer.File }): Promise<{ message: string; updatedCity: City }> {
        const city = await this.cityModel.findByPk(id);

        if (files?.image) {
            if (city.city_image) await this.fileService.deleteFile(city.city_image);
            city.city_image = await this.fileService.uploadFile(files.image);
        }

        if (files?.video) {
            if (city.city_video) await this.fileService.deleteFile(city.city_video);
            city.city_video = await this.fileService.uploadFile(files.video);
        }

        await city.update({ ...payload, city_image: city.city_image, city_video: city.city_video });
        return { message: 'City updated successfully', updatedCity: city };
    }

    async deleteCity(id: number): Promise<{ message: string }> {
        const city = await this.cityModel.findByPk(id);

        if (city.city_image) {
            await this.fileService.deleteFile(city.city_image);
        }
        if (city.city_video) {
            await this.fileService.deleteFile(city.city_video);
        }

        await city.destroy();
        return { message: "City deleted successfully" };
    }
}
