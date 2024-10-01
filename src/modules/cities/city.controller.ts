import { Controller, Get } from "@nestjs/common";
import { CityService } from "./city.service";
import { City } from "./schemas";

@Controller('cities')
export class CityController {
    #_service: CityService;

    constructor(service: CityService){
        this.#_service = service
    }
    
    @Get()
    async getCities() :Promise<City[]> {
        return await this.#_service.getAllCities();
    }

    @Get('/id')
    async getSingleCity(id:number): Promise<City> {
        return await this.#_service.getSingleCity(id);
    }

}