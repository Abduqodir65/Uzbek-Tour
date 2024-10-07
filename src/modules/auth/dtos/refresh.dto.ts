import { IsJWT, IsNotEmpty } from "class-validator";
import { RefreshRequest } from "../interfaces";

export class RefreshDto implements RefreshRequest {

    @IsJWT()
    @IsNotEmpty()
    refreshToken: string;
}