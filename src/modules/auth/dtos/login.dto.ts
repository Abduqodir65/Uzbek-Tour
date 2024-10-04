import { LoginRequest } from "../interfaces";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class LoginDto implements LoginRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;
}