module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'admin',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './admin.sqlite'
    }
  }
}