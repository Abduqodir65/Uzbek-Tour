import { Controller, Get } from "@nestjs/common";
import { RoutesService } from "./top-routes.service";
import { Routes } from "./schemas";

@Controller('routes')
export class RoutesController {
    #_service: RoutesService;

    constructor(service: RoutesService){
        this.#_service = service
    }
    
    @Get()
    async getRoutes() :Promise<Routes[]> {
        return await this.#_service.getAllRoutes();
    }
}