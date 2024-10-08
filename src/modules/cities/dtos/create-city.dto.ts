import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateCityRequest } from "../interfaces";

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

    @IsOptional() // Agar ixtiyoriy bo'lsa
    @IsString() // Agar rasm/fayl yo'li `string` bo'lsa
    city_image: string; 

    @IsOptional() // Agar ixtiyoriy bo'lsa
    @IsString() // Agar video yo'li `string` bo'lsa
    city_video: string;
}