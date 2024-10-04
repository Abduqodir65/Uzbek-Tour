import { IsNotEmpty, IsString } from "class-validator";
import { UpdateRouteRequest } from "../interfaces";

export class UpdateRouteDto implements Omit<UpdateRouteRequest, "image"> {
    @IsString()
    name: string;

    @IsString()
    description:string;

    image: any;
}