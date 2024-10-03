import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { GaleryService } from './galery.service';
import { Galery } from './schemas';
import { CreateGaleryRequest, UpdateGaleryRequest } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { ExceptionHandlerFilter } from 'src/filters';
import { CreateGaleryDto } from './dtos';

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

    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    async createGalery(
        @Body() createGaleryDto: CreateGaleryDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        return this.galeryService.createGalery(createGaleryDto,image)
    }

    @Put('/update:id')
    async updateGalery(
        @Param('id') id: number,
        @Body() updateGaleryPayload: UpdateGaleryRequest
    ): Promise<Galery> {
        return this.galeryService.updateGalery(id, updateGaleryPayload);
    }

    @Delete('/delete/:id')
    async deleteGalery(@Param('id') id:string) {
        return this.galeryService.deleteGalery(+id)
    }
}
