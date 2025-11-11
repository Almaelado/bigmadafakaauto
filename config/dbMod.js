const mysql=require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER2 ,
    password: process.env.DB_PASSWORD2,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306,
    dateStrings: true
});

module.exports=pool;