import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schemas";
import * as path from "path";
import * as multer from "multer";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserRequest } from "./interfaces";

@Controller('users')
export class UserController {
    #_service: UserService;

    constructor(service: UserService) {
        this.#_service = service;
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.#_service.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.#_service.getUserById(Number(id));
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor("image", {
        storage: multer.diskStorage({
            destination(req, file, callback) {
                return callback(null, "./uploads");
            },
            filename(req, file, cb) {
                const extName = path.extname(file.originalname);
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + extName);
            }
        })
    }))
    async createUser(
        @Body() createUserPayload: CreateUserRequest,
        @UploadedFile() image: Express.Multer.File
    ): Promise<{ message: string; user: CreateUserRequest }> {
        if (image) {
            createUserPayload.image = image.filename;
        }
        await this.#_service.createUser(createUserPayload);
        return {
            message: 'success',
            user: createUserPayload
        };
    }

    @Patch('update/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserPayload: UpdateUserDto
    ): Promise<{ message: string; updatedUser: UpdateUserDto }> {

        await this.#_service.updateUser(Number(id), updateUserPayload);

        return {
            message: 'User updated successfully',
            updatedUser: updateUserPayload
        };
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<{message: string}> {
        await this.#_service.deleteUser(Number(id));
        return {message:"User deleted successfully"}
    }
}
