import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { RoutesService } from "./top-routes.service";
import { Routes } from "./schemas";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateRouteDto, UpdateRouteDto } from "./dtos";

@Controller('routes')
export class RoutesController {
    #_service: RoutesService;

    constructor(service: RoutesService) {
        this.#_service = service;
    }

    @Get()
    async getAllRoutes(): Promise<Routes[]> {
        return await this.#_service.getAllRoutes();
    }

    @Get('/:id')
    async getRouteById(@Param('id') id: string): Promise<Routes> {
        return await this.#_service.getRouteById(Number(id));
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    async createRoute(
        @Body() createRoutePayload: CreateRouteDto,
        @UploadedFile() image: Express.Multer.File
    ): Promise<{ message: string; new_route: CreateRouteDto }> {
        await this.#_service.createRoute(createRoutePayload, image);

        return {
            message: "Route created successfully",
            new_route: createRoutePayload
        };
    }

    @Patch('update/:id')
    async updateRoute(
        @Param('id') id: string,
        @Body() updateRoutePayload: UpdateRouteDto,
        @UploadedFile() image?: Express.Multer.File
    ): Promise<{ message: string; updatedRoute: UpdateRouteDto }> {
        await this.#_service.updateRoute(Number(id), updateRoutePayload, image);

        return {
            message: 'Route updated successfully',
            updatedRoute: updateRoutePayload
        };
    }

    @Delete('delete/:id')
    async deleteRoute(@Param('id') id: string): Promise<{ message: string }> {
        return await this.#_service.deleteRoute(Number(id));
    }
}
