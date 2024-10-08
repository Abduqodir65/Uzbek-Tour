
export const jwtConfig = () => ({
    jwt: {
        accessKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        accessTime: parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME),
        refreshKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        refreshTime: process.env.REFRESH_TOKEN_EXPIRE_TIME
    }
})