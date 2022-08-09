export const EnvConfig = () => ({
    environment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,
})