import { IsNotEmpty, IsString } from "class-validator";
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

    city_image: any;
    city_video: any;
}