import { Injectable } from "@nestjs/common";
import { Galery } from "./schemas";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class GaleryService {
    constructor(@InjectModel(Galery) private galeryModel: typeof Galery) {}

    async getAllGaleries(): Promise<Galery[]> {
        return await this.galeryModel.findAll();
    }

}