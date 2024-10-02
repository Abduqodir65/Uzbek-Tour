import { Injectable, NotFoundException } from '@nestjs/common';
import { Galery } from './schemas';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGaleryRequest, UpdateGaleryRequest } from './interfaces'; 
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class GaleryService {
    constructor(@InjectModel(Galery) private galeryModel: typeof Galery) {}

    async getAllGaleries(): Promise<Galery[]> {
        return await this.galeryModel.findAll();
    }

    async getGaleryById(id: number): Promise<Galery> {
        const galery = await this.galeryModel.findOne({ where: { id } });
        if (!galery) {
            throw new NotFoundException(`Galery with id ${id} not found`);
        }
        return galery;
    }

    async createGalery(payload: CreateGaleryRequest): Promise<{ message: string; galery: Galery }> {
        const galery = await this.galeryModel.create({
            city_name: payload.city_name,
            image: payload.image,
        });
        return { message: 'Galery created successfully', galery };
    }

    async updateGalery(id: number, payload: UpdateGaleryRequest): Promise<Galery> {
        const galery = await this.galeryModel.findByPk(id);
        if (!galery) {
            throw new NotFoundException(`Galery with id ${id} not found`);
        }
        return await galery.update(payload);
    }

    
}
