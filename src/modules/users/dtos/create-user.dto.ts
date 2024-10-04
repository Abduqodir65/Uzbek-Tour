import { IsInt,  IsNotEmpty, IsString } from "class-validator";
import { CreateUserRequest } from "../interfaces";

export class CreateUserDto implements Omit<CreateUserRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    country: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    image: any;

}