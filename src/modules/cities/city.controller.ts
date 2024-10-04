import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CityService } from "./city.service";
import { City } from "./schemas";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateCityDto, UpdateCityDto } from "./dtos";

@Controller('cities')
export class CityController {
    #_service: CityService;

    constructor(service: CityService) {
        this.#_service = service;
    }

    @Get()
    async getAllCities(): Promise<City[]> {
        return await this.#_service.getAllCities();
    }

    @Get('/:id')
    async getCityById(@Param('id') id: string): Promise<City> {
        return await this.#_service.getCityById(Number(id));
    }

    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]))
    async createCity(
        @Body() createCityPayload: CreateCityDto,
        @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] }
    ): Promise<{ message: string; new_city: CreateCityDto }> {
        const image = files.image ? files.image[0] : null;
        const video = files.video ? files.video[0] : null;

        await this.#_service.createCity(createCityPayload, { image, video });

        return {
            message: "City created successfully",
            new_city: createCityPayload
        };
    }

    @Patch('update/:id')
    async updateCity(
        @Param('id') id: string,
        @Body() updateCityPayload: UpdateCityDto,
        @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] }
    ): Promise<{ message: string; updatedCity: UpdateCityDto }> {
        const image = files?.image ? files.image[0] : null;
        const video = files?.video ? files.video[0] : null;

        await this.#_service.updateCity(Number(id), updateCityPayload, { image, video });

        return {
            message: 'City updated successfully',
            updatedCity: updateCityPayload
        };
    }

    @Delete('delete/:id')
    async deleteCity(@Param('id') id: string): Promise<{ message: string }> {
        return await this.#_service.deleteCity(Number(id));
    }
}
