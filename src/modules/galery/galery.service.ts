import { Injectable, NotFoundException } from '@nestjs/common';
import { Galery } from './schemas';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGaleryRequest, UpdateGaleryRequest } from './interfaces'; 
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateGaleryDto } from './dtos';
import { FileService } from '../file';

@Injectable()
export class GaleryService {
    constructor(@InjectModel(Galery) private galeryModel: typeof Galery, private readonly fileService:FileService) {}

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

    async createGalery(createGalery: CreateGaleryDto, file:Express.Multer.File): Promise<object>{
        const image = await this.fileService.uploadFile(file)
        const new_galery = await this.galeryModel.create({...CreateGaleryDto, image})
        return {
            message: 'New galery added successfully',
            data: new_galery
        }
    }


    async updateGalery(id: number, payload: UpdateGaleryRequest): Promise<Galery> {
        const galery = await this.galeryModel.findByPk(id);
        if (!galery) {
            throw new NotFoundException(`Galery with id ${id} not found`);
        }
        return await galery.update(payload);
    }

    
}
