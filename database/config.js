require('dotenv').config()

const config = {
  connectionLimit: 10,
  host: process.env.database,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
}

module.exports = config
