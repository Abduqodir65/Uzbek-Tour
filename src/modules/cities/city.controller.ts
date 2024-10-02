import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CityService } from "./city.service";
import { City } from "./schemas";
import { CreateCityRequest } from "./interface";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import * as path from "path";

@Controller('cities')
export class CityController {
    #_service: CityService;

    constructor(service: CityService) {
        this.#_service = service
    }

    @Get()
    async getCities(): Promise<City[]> {
        return await this.#_service.getAllCities();
    }

    @Get('/id')
    async getSingleCity(id: number): Promise<City> {
        return await this.#_service.getSingleCity(id);
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor("image", {
        storage: multer.diskStorage({
            destination(req, file, callback) {
                return callback(null, "./uploads");
            },
            filename(req, file, cb) {
                const extName = path.extname(file.originalname);
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + extName);
            }
        })
    }))
    async createCity(
        @Body() createCityPayload: CreateCityRequest,
        @UploadedFile() image: Express.Multer.File
    ): Promise<{ message: string; city: CreateCityRequest }> {
        if (image) {
            createCityPayload.city_image = image.filename;
        }
        await this.#_service.createCity(createCityPayload);
        return {
            message: 'success',
            city: createCityPayload
        };
    }

    @Put('/update/:id')
    async updateCity(
        @Param('id') id: number,
        @Body() updateCityPayload: CreateCityRequest
    ): Promise<{ message: string; city: City }> {
        const updatedCity = await this.#_service.updateCity(id, updateCityPayload);
        return {
            message: 'City updated successfully',
            city: updatedCity.city
        };
    }

    @Delete('/delete/:id')
    async deleteCity(@Param('id') id: number): Promise<{ message: string }> {
        return await this.#_service.deleteCity(id);
    }

}