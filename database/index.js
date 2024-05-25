const mysql = require("mysql2/promise");
const createCustomerTable = require("./schema/customerTable");
const createUserTable = require("./schema/userTable");
const dotenv = require("dotenv");
dotenv.config();

async function initializeTables(connection) {
  await createCustomerTable(connection);
  await createUserTable(connection);
}

const connection_info = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

async function initializeDatabase() {
  const connection = await mysql.createConnection(connection_info);

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\``
  );

  await connection.query(`USE \`${process.env.DATABASE}\``);

  await initializeTables(connection);

  console.log("Database setup finished");

  await connection.end();
}

const pool = mysql.createPool(connection_info);

module.exports = { pool, initializeDatabase };
