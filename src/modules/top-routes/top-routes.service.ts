import { Injectable } from "@nestjs/common";
import { Routes } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRouteDto, UpdateRouteDto } from "./dtos";
import { FileService } from "../file";

@Injectable()
export class RoutesService {
    constructor(@InjectModel(Routes) private routesModel: typeof Routes, private readonly fileService: FileService) { }

    async getAllRoutes(): Promise<Routes[]> {
        return await this.routesModel.findAll();
    }

    async getRouteById(id: number): Promise<Routes> {
        return await this.routesModel.findOne({
            where: { id },
        });
    }

    async createRoute(payload: CreateRouteDto, file: Express.Multer.File): Promise<{ message: string; new_route: Routes }> {
        const route_image = file ? await this.fileService.uploadFile(file) : null;

        const new_route = await this.routesModel.create({
            name: payload.name,
            description: payload.description,
            route_image,
        });

        return { message: 'Route created successfully', new_route };
    }

    async updateRoute(id: number, payload: UpdateRouteDto, file?: Express.Multer.File): Promise<{ message: string; updatedRoute: Routes }> {
        const route = await this.routesModel.findByPk(id);

        if (file) {
            if (route.image) await this.fileService.deleteFile(route.image);
            route.image = await this.fileService.uploadFile(file);
        }

        await route.update({ ...payload, image: route.image });
        return { message: 'Route updated successfully', updatedRoute: route };
    }

    async deleteRoute(id: number): Promise<{ message: string }> {
        const route = await this.routesModel.findByPk(id);

        if (route.image) {
            await this.fileService.deleteFile(route.image);
        }

        await route.destroy();
        return { message: "Route deleted successfully" };
    }
}
