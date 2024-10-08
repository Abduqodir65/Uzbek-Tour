import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UpdateCityRequest } from "../interfaces";

export class UpdateCityDto implements Omit<UpdateCityRequest, "image"> {
    @IsString()
    name: string;

    @IsString()
    description:string;

    @IsString()
    region:string;

    @IsString()
    history:string;

    @IsString()
    climate:string;

    @IsOptional()
    city_image?: any;

    @IsOptional()
    city_video?: any;
}