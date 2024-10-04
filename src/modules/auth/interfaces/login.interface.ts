export declare interface LoginRequest {
    email: string,
    phone: string,
}

export declare interface LoginResponse {
    accessToken: string,
    refreshToken:string
}