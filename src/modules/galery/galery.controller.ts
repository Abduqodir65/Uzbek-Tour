import { Controller, Get } from "@nestjs/common";
import { GaleryService } from "./galery.service";
import { Galery } from "./schemas";

@Controller('galeries')
export class GaleryController {
    #_service: GaleryService;

    constructor(service: GaleryService){
        this.#_service = service
    }
    
    @Get()
    async getGaleries() :Promise<Galery[]> {
        return await this.#_service.getAllGaleries();
    }
}