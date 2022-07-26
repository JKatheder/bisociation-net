const Pool = require('pg').Pool;
const pool = new Pool({
    user: ' ',
    password: 'qrtx0Postgress',
    host: 'localhost',
    port: 5432,
    database: 'bisociationnet',
});

module.exports = pool;