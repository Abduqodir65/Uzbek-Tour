import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GaleryService } from './galery.service';
import { Galery } from './schemas';
import { CreateGaleryRequest, UpdateGaleryRequest } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';

@Controller('galery')
export class GaleryController {
    constructor(private readonly galeryService: GaleryService) { }

    @Get()
    async getAllGaleries(): Promise<Galery[]> {
        return this.galeryService.getAllGaleries();
    }

    @Get(':id')
    async getGaleryById(@Param('id') id: number): Promise<Galery> {
        return this.galeryService.getGaleryById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor("image", {
        storage: multer.diskStorage({
            destination(req, file, callback) {
                callback(null, './uploads'); // Rasm saqlanadigan papka
            },
            filename(req, file, cb) {
                const extName = path.extname(file.originalname);
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + extName); // Unikal fayl nomi
            }
        })
    }))
    async createGalery(
        @Body() createGaleryPayload: CreateGaleryRequest,
        @UploadedFile() image: Express.Multer.File
    ): Promise<{ message: string; galery: Galery }> {
        if (image) {
            createGaleryPayload.image = image.filename;
        }
        return this.galeryService.createGalery(createGaleryPayload);
    }

    @Put(':id')
    async updateGalery(
        @Param('id') id: number,
        @Body() updateGaleryPayload: UpdateGaleryRequest
    ): Promise<Galery> {
        return this.galeryService.updateGalery(id, updateGaleryPayload);
    }

    @Delete(':id')
    async deleteGalery(@Param('id') id: number): Promise<{ message: string }> {
        return this.galeryService.deleteGalery(id);
    }
}
