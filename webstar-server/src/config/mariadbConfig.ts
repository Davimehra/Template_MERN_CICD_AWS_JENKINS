import { Knex } from "knex";
// mysql2 is used here as client 
// make sure to install it 'npm i mysql2 --save'
const knexConfig: Knex.Config = {
    client: 'mysql2', connection: {
        host: "mariadb-service",
        database: "primary_db",
        user: "root",
        password: "mypass",
        port: 3306
    }

}

module.exports = knexConfig;