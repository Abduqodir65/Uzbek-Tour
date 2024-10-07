export declare interface RefreshRequest {
    refreshToken: string
}

export declare interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}