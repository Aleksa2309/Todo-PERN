const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "jagodina",
    host: "localhost",
    port: 5433,
    database: "todo"
});

module.exports = pool;