module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'capstone',
        user: process.env.DB_USER || 'capstone',
        password: process.env.DB_PASS || 'capstone',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './capstone/sqlite'
        }
    }
}