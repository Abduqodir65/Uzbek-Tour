export declare interface LoginRequest {
    email: string,
    phone: string,
}

export declare interface LoginResponse {
    message:string;
    accessToken: string,
    refreshToken:string
}