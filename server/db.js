const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'Pos.12.QL',
    host: 'localhost',
    port: 5432,
    database: 'bisociationnet',
});

module.exports = pool;