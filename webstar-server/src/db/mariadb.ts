import knex, { Knex } from "knex";

const mariadbConfig = require('../config/mariadbConfig');

const knexConnect: Knex = knex(mariadbConfig)

module.exports = knexConnect;