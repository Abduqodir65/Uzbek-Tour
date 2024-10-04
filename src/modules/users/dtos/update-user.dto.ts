import { IsInt,  IsNotEmpty, IsString } from "class-validator";
import { UpdateUserRequest } from "../interfaces";

export class UpdateUserDto implements Omit<UpdateUserRequest, "image"> {
    @IsString()
    name ?: string;

    @IsInt()
    age ?: number;

    @IsString()
    country ?: string;
    
    @IsString()
    email ?: string;

    @IsString()
    role ?: string;

    image : any;

}