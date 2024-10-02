import {  IsNotEmpty, IsString } from "class-validator";
import { CreateGaleryRequest } from "../interfaces";

export class CreateGaleryDto implements Omit<CreateGaleryRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    image: any;

}