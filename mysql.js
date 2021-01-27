const mysql=require('mysql');

var pool=mysql.createPool({
    "user":process.env.MYQSL_USER,
    "password":process.env.MYQSL_PASSWORD,
    "database":process.env.MYQSL_DATABASE,
    "host":process.env.MYQSL_HOST,
    "port":process.env.MYQSL_PORT
});
exports.pool=pool;