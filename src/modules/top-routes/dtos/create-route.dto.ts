import { IsNotEmpty, IsString } from "class-validator";
import { CreateRouteRequest } from "../interfaces";

export class CreateRouteDto implements Omit<CreateRouteRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description:string;

    image: any;
}