import { IsNotEmpty, IsString } from "class-validator";
import { CreateCityRequest } from "../interface";

export class CreateCityDto implements Omit<CreateCityRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    region:string;

    @IsString()
    @IsNotEmpty()
    history:string;

    @IsString()
    @IsNotEmpty()
    climate:string;

    city_image: any;
    city_video: any;
}