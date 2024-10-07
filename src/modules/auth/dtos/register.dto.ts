import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString ,IsInt} from "class-validator";
import { RegisterRequest } from "../interfaces";

export class RegisterDto implements RegisterRequest {
    

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsInt()
    @IsNotEmpty()
    age:number;

    @IsString()
    @IsNotEmpty()
    country:string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    role:string;

    image:any;
}