export declare interface RegisterRequest {
    name:string;
    age:number;
    country:string;
    email: string;
    role:string;
    image:string;
}

export declare interface RegisterResponse {
    message:string;
    accessToken: string,
    refreshToken:string
}