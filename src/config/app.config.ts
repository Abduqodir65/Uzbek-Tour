export const appConfig = () => ({
    appConfig: {
        port: parseInt(process.env.APP_PORT) || 3000,
        host: process.env.APP_HOST
    }
})