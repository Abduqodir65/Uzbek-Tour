import { Injectable } from "@nestjs/common";
import { Routes } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class RoutesService {
    constructor(@InjectModel(Routes) private routesModel: typeof Routes) {}

    async getAllRoutes(): Promise<Routes[]> {
        return await this.routesModel.findAll();
    }

}