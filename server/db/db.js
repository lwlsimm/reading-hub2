const Pool = require('pg').Pool;
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT),
    database: process.env.SERVER_DATABASE
});

module.exports = pool;