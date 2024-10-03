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



}